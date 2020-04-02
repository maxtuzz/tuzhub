package io.tuzzy.portal.service

import io.javalin.http.BadRequestResponse
import io.javalin.http.NotFoundResponse
import io.tuzzy.portal.ResourceHelp.Companion.readYamlToJsonMap
import io.tuzzy.portal.api.ApiSpec
import io.tuzzy.portal.domain.DApiEntry
import io.tuzzy.portal.domain.DApiSpec
import io.tuzzy.portal.domain.SpecStatus
import io.tuzzy.portal.domain.query.QDApiEntry
import io.tuzzy.portal.domain.query.QDApiSpec
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.Assertions.assertAll
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.function.Executable
import kotlin.test.assertFailsWith

internal class ApiSpecServiceTest {
    private lateinit var specService: ApiSpecService

    private val apiName = "empire-api"
    private val updateSpecUrl = "specs/uspto.yaml"

    @BeforeEach
    fun setup() {
        specService = ApiSpecService(RemoteOpenAPIService())

        // Create api entry with a spec
        val entry = DApiEntry("Empire API", "Deprecating the old republic")
        entry.save()

        val spec = DApiSpec(
            apiEntry = entry,
            status = SpecStatus.ACTIVE,
            specUrl = "specs/petstore.yaml"
        )

        spec.save()
    }

    @AfterEach
    fun tearDown() {
        QDApiSpec().delete()
        QDApiEntry().delete()
    }

    @Test
    fun `Get pollable specs`() {
        val entry = DApiEntry("Baby Yoda", "The force is strong with this one")
        entry.save()

        // Create 2 specs, one of which is pollable
        DApiSpec(
            apiEntry = entry,
            status = SpecStatus.PRE_RELEASE,
            specUrl = "spec/petstore.yaml"
        ).save()

        DApiSpec(
            apiEntry = entry,
            status = SpecStatus.HISTORIC,
            specUrl = "specs/petstore.yaml"
        ).save()

        val specs: List<DApiSpec> = specService.getPollableSpecs()

        assertThat(specs).hasSize(2)
    }

    @Test
    fun `Create spec by parsing yaml`() {
        val displayName = "YAML API"
        val entry = DApiEntry(displayName, "This spec is manually maintained")
        entry.save()

        val json = readYamlToJsonMap("/specs/petstore.yaml")

        val specVersion = "v1"
        specService.saveSpec(entry, SpecStatus.ACTIVE, specVersion, json)

        val activeSpec = specService.getActiveSpec(displayName.toLowerCase().replace(" ", "-"))

        assertAll(
            Executable { assertThat(activeSpec.specUrl).isNull() },
            Executable { assertThat(activeSpec.specVersion).isEqualTo(specVersion) }
        )
    }

    @Test
    fun `Get spec with active status`() {
        val spec: DApiSpec = specService.getActiveSpec(apiName)

        assertAll(
            Executable { assertThat(spec).isNotNull },
            Executable { assertThat(spec.apiEntry.name).isEqualTo(apiName) }
        )
    }

    @Test
    fun `Get spec by its version`() {
        val spec: ApiSpec = specService.getSpecByVersion(apiName, "v1")

        assertAll(
            Executable { assertThat(spec).isNotNull },
            Executable { assertThat(spec.apiName).isEqualTo(apiName) }
        )
    }

    @Test
    fun `Delete spec`() {
        val spec: DApiSpec = specService.getActiveSpec(apiName)
        assertThat(spec).isNotNull

        // Delete active spec by its api + spec version tag
        specService.deleteSpec(apiName, "v1")

        assertFailsWith<NotFoundResponse> {
            specService.getActiveSpec(apiName)
        }
    }

    @Test
    fun `Update spec`() {
        val updateSpecVersion = "v2"
        val specUrl = "specs/identity.yaml"

        val updateReq = ApiSpec(
            specVersion = updateSpecVersion,
            specUrl = specUrl,
            status = SpecStatus.ACTIVE
        )

        specService.updateSpec(apiName, "v1", updateReq)

        val spec: DApiSpec? = specService.getActiveSpec(apiName)

        assertAll(
            Executable { assertThat(spec?.specVersion).isEqualTo(updateSpecVersion) },
            Executable { assertThat(spec?.specUrl).isEqualTo(specUrl) }
        )
    }

    @Test
    fun `Update spec manually`() {
        val updateSpecVersion = "v2"

        toggleOffDynamicConf()

        val jsonSpec = readYamlToJsonMap("/specs/identity.yaml")

        val updateReq = ApiSpec(
            specVersion = updateSpecVersion,
            status = SpecStatus.ACTIVE,
            spec = jsonSpec
        )

        specService.updateSpec(apiName, "v1", updateReq)

        val spec: DApiSpec? = specService.getActiveSpec(apiName)

        assertAll(
            Executable { assertThat(spec?.specVersion).isEqualTo(updateSpecVersion) },
            Executable { assertThat(spec?.specUrl).isEqualTo(null) }
        )
    }

    @Test
    fun `Get all specs`() {
        val specs: List<ApiSpec> = specService.getApiSpecs(apiName)

        assertThat(specs).hasSize(1)
    }

    @Test
    fun `Create new spec version`() {
        val updateSpecVersion = "v2"

        specService.createSpecVersion(
            apiName, ApiSpec(
                specVersion = updateSpecVersion,
                specUrl = updateSpecUrl,
                status = SpecStatus.ACTIVE
            )
        )

        val specs: List<ApiSpec> = specService.getApiSpecs(apiName)

        assertThat(specs).hasSize(2)

        val statuses = specs.map { it.status }

        assertAll(
            Executable { assertThat(statuses).contains(SpecStatus.ACTIVE) },
            Executable { assertThat(statuses).contains(SpecStatus.HISTORIC) }
        )
    }

    @Test
    fun `New version with manual spec`() {
        // Turn dynamic config off
        toggleOffDynamicConf()

        val jsonSpec = readYamlToJsonMap("/specs/identity.yaml")

        specService.createSpecVersion(
            apiName, ApiSpec(
                specVersion = "v2",
                status = SpecStatus.ACTIVE,
                spec = jsonSpec
            )
        )

        val specs: List<ApiSpec> = specService.getApiSpecs(apiName)

        assertThat(specs).hasSize(2)

        val statuses = specs.map { it.status }

        assertAll(
            Executable { assertThat(statuses).contains(SpecStatus.ACTIVE) },
            Executable { assertThat(statuses).contains(SpecStatus.HISTORIC) }
        )
    }

    @Test
    fun `Fails on manual spec upload when dynamic config is turned on`() {
        assertFailsWith<BadRequestResponse> {
            specService.createSpecVersion(
                apiName, ApiSpec(
                    specVersion = "v2",
                    spec = mutableMapOf(),
                    status = SpecStatus.ACTIVE
                )
            )
        }
    }

    @Test
    fun `Refresh spec`() {
        specService.refreshSpec(apiName, "active")

        val dApiSpec = specService.getActiveSpec(apiName)

        assertThat(dApiSpec.spec).isNotNull
    }

    @Test
    fun `Get all specs for an API`() {
        val specs = specService.getAll(apiName)

        assertThat(specs).hasSize(1)
    }

    private fun toggleOffDynamicConf() {
        QDApiEntry()
            .name.eq(apiName)
            .asUpdate()
            .set("dynamicConf", false)
            .update()
    }
}
