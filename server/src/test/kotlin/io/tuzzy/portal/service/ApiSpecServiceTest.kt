package io.tuzzy.portal.service

import io.tuzzy.portal.api.ApiSpec
import io.tuzzy.portal.domain.DApiEntry
import io.tuzzy.portal.domain.DApiSpec
import io.tuzzy.portal.domain.SpecStatus
import io.tuzzy.portal.domain.query.QDApiEntry
import io.tuzzy.portal.domain.query.QDApiSpec
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test

internal class ApiSpecServiceTest {
    private lateinit var specService: ApiSpecService

    private val apiName = "empire-api"

    @BeforeEach
    fun setup() {
        specService = ApiSpecService()

        // Create api entry with a spec
        val entry = DApiEntry("Empire API", "Deprecating the old republic")
        entry.save()

        val spec = DApiSpec(
            apiEntry = entry,
            specUrl = "http://execute.order.66"
        )

        spec.save()
    }

    @AfterEach
    fun tearDown() {
        QDApiSpec().delete()
        QDApiEntry().delete()
    }

    @Test
    fun getActiveSpec() {
        val spec: DApiSpec? = specService.getActiveSpec(apiName)

        assertThat(spec).isNotNull
        assertThat(spec?.apiEntry?.name).isEqualTo(apiName)
    }

    @Test
    fun deleteSpec() {
        specService.deleteSpec(apiName, "v1")

        val spec: DApiSpec? = specService.getActiveSpec(apiName)

        assertThat(spec).isNull()
    }

    @Test
    fun updateSpec() {
        val updateSpecVersion = "v2"
        val updateSpecUrl = "http://execute.order.66/v2"

        val updateReq = ApiSpec(
            specVersion = updateSpecVersion,
            specUrl = updateSpecUrl,
            status = SpecStatus.ACTIVE
        )

        specService.updateSpec(apiName, updateReq)

        val spec: DApiSpec? = specService.getActiveSpec(apiName)

        assertThat(spec?.specVersion).isEqualTo(updateSpecVersion)
        assertThat(spec?.specUrl).isEqualTo(updateSpecUrl)
    }
}