package io.tuzzy.portal.web

import io.tuzzy.portal.ResourceHelp.Companion.read
import io.tuzzy.portal.domain.SpecStatus
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test

class ApiSpecControllerTest : WebTest() {
    private val apiName = "identity-api"

    @Test
    fun createSpecAndGetActive() {
        postApiSpec()

        val activeSpec = getApiSpec(apiName, "active")

        assertThat(activeSpec.apiName).isEqualTo(apiName)
        assertThat(activeSpec.status).isEqualTo(SpecStatus.ACTIVE)
    }

    @Test
    fun getBySpecVersion() {
        val preReleaseVersion = "v2-dev"

        val apiBody = read("/request/api-1a.json")
        postApi(apiBody)

        val specBody = read("/request/spec-1b.json")
        postSpec(apiName, specBody)

        val apiSpec = getApiSpec(apiName, preReleaseVersion)

        assertThat(apiSpec.apiName).isEqualTo(apiName)
        assertThat(apiSpec.specVersion).isEqualTo(preReleaseVersion)

        assertThat(apiSpec.status).isEqualTo(SpecStatus.PRE_RELEASE)
    }

    private fun postApiSpec() {
        val apiBody = read("/request/api-1a.json")
        postApi(apiBody)

        val specBody = read("/request/spec-1a.json")
        postSpec(apiName, specBody)
    }
}