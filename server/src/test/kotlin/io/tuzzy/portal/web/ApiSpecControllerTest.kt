package io.tuzzy.portal.web

import io.tuzzy.portal.api.ApiSpec
import io.tuzzy.portal.domain.DApiEntry
import io.tuzzy.portal.domain.DApiSpec
import io.tuzzy.portal.domain.SpecStatus
import kong.unirest.GenericType
import kong.unirest.Unirest
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test

class ApiSpecControllerTest : WebTest() {
    @Test
    fun get() {
        // Create api and spec
        val dApiEntry = DApiEntry("Test API", "API")
        dApiEntry.save()

        val specVersion = "v1"

        val apiSpec = DApiSpec(dApiEntry, specVersion, SpecStatus.ACTIVE, "http://hello.there.general")
        apiSpec.save()


        // Get spec via rest call
        val spec = getApiSpec(dApiEntry.name, specVersion);

        assertThat(spec.apiName).isEqualTo(dApiEntry.name)
    }


    private fun getApiSpec(apiName: String, specVersion: String): ApiSpec {
        return Unirest.get("http://localhost:${servicePort}/api-entries/${apiName}/specs/$specVersion")
            .header("Content-Type", "application/json")
            .asObject(object : GenericType<ApiSpec>() {})
            .getBody()
    }
}