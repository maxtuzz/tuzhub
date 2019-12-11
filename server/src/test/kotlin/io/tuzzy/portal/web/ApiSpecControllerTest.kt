package io.tuzzy.portal.web

import io.tuzzy.portal.ResourceHelp.Companion.read
import io.tuzzy.portal.domain.SpecStatus
import org.junit.jupiter.api.Assertions.assertAll
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.function.Executable
import kotlin.test.assertEquals

class ApiSpecControllerTest : WebTest() {
    private val apiName = "identity-api"

    @Test
    fun `POST and GET ApiSpec`() {
        postApiSpec()

        val activeSpec = getApiSpec(apiName, "active")

        assertAll(
            Executable { assertEquals(activeSpec.apiName, apiName) },
            Executable { assertEquals(activeSpec.status, SpecStatus.ACTIVE) }
        )
    }

    @Test
    fun `GET ApiSpec by version`() {
        val preReleaseVersion = "v2-dev"

        val apiBody = read("/request/api-1a.json")
        postApi(apiBody)

        val specBody = read("/request/spec-1b.json")
        postSpec(apiName, specBody)

        val apiSpec = getApiSpec(apiName, preReleaseVersion)

        assertAll(
            Executable { assertEquals(apiSpec.apiName, apiName) },
            Executable { assertEquals(apiSpec.specVersion, preReleaseVersion) },
            Executable { assertEquals(apiSpec.status, SpecStatus.PRE_RELEASE) }
        )
    }

    private fun postApiSpec() {
        val apiBody = read("/request/api-1a.json")
        postApi(apiBody)

        val specBody = read("/request/spec-1a.json")
        postSpec(apiName, specBody)
    }
}