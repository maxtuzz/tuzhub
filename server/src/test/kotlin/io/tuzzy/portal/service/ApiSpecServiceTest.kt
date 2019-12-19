package io.tuzzy.portal.service

import io.javalin.http.NotFoundResponse
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
import java.util.*
import kotlin.test.assertFailsWith

internal class ApiSpecServiceTest {
    private lateinit var specService: ApiSpecService

    private val apiName = "empire-api"
    private val updateSpecUrl =
        "https://raw.githubusercontent.com/OAI/OpenAPI-Specification/master/examples/v3.0/uspto.yaml"

    @BeforeEach
    fun setup() {
        specService = ApiSpecService(RemoteOpenAPIService())

        // Create api entry with a spec
        val entry = DApiEntry("Empire API", "Deprecating the old republic")
        entry.save()

        val spec = DApiSpec(
            apiEntry = entry,
            status = SpecStatus.ACTIVE,
            specUrl = "https://raw.githubusercontent.com/OAI/OpenAPI-Specification/master/examples/v3.0/petstore-expanded.yaml"
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
            specUrl = "https://raw.githubusercontent.com/OAI/OpenAPI-Specification/master/examples/v3.0/petstore-expanded.yaml"
        ).save()

        DApiSpec(
            apiEntry = entry,
            status = SpecStatus.HISTORIC,
            specUrl = "https://raw.githubusercontent.com/OAI/OpenAPI-Specification/master/examples/v3.0/petstore-expanded.yaml"
        ).save()

        val specs: List<DApiSpec> = specService.getPollableSpecs()

        assertThat(specs).hasSize(2)
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
        val specUrl = "https://raw.githubusercontent.com/maxtuzz/tuzzy-dev-portal/master/server/src/test/resources/specs/petstore.yaml"

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
}