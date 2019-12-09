package io.tuzzy.portal.web

import io.tuzzy.portal.ResourceHelp.Companion.read
import io.tuzzy.portal.api.ApiSpec
import io.tuzzy.portal.domain.DApiEntry
import io.tuzzy.portal.domain.DApiSpec
import io.tuzzy.portal.domain.SpecStatus
import kong.unirest.GenericType
import kong.unirest.Unirest
import org.assertj.core.api.Assertions.assertThat
import org.junit.Ignore
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test

class ApiSpecControllerTest : WebTest() {
    private val apiName = "empire-api"

    @Test
    fun createSpec() {
        val bodyA = read("/request/spec-1a.json")
        postSpec(apiName, bodyA)
    }

    @Test
    @Ignore
    fun getActiveSpec() {
        val apiSpec = getApiSpec(apiName, "active")

        assertThat(apiSpec.apiName).isEqualTo(apiName)
        assertThat(apiSpec.status).isEqualTo(SpecStatus.ACTIVE)
    }

    @Test
    @Ignore
    fun getBySpecVersion() {
        val preReleaseVersion = "v2-dev"

        val apiSpec = getApiSpec(apiName, preReleaseVersion)

        assertThat(apiSpec.apiName).isEqualTo(apiName)
        assertThat(apiSpec.specVersion).isEqualTo(preReleaseVersion)

        assertThat(apiSpec.status).isEqualTo(SpecStatus.PRE_RELEASE)
    }

    private fun getApiSpec(apiName: String, specVersion: String): ApiSpec {
        return Unirest.get("http://localhost:${servicePort}/api-entries/${apiName}/specs/$specVersion")
            .header("Content-Type", "application/json")
            .asObject(object : GenericType<ApiSpec>() {})
            .getBody()
    }
}