package io.tuzzy.portal.web

import io.tuzzy.portal.ResourceHelp.Companion.read
import io.tuzzy.portal.domain.SpecStatus
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Assertions.assertAll
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.function.Executable
import kotlin.test.assertEquals
import kotlin.test.assertFailsWith

class ApiSpecControllerTest : WebTest() {
    private val apiName = "identity-api"
    private val specVersion = "v2-dev"

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
    fun `POST new version and GET ApiSpec`() {
        val preReleaseVersion = "v2-dev"

        val apiBody = read("/request/api-1a.json")
        postApi(apiBody)

        val specBody = read("/request/spec-2a.json")
        postSpec(apiName, specBody)

        val apiSpec = getApiSpec(apiName, preReleaseVersion)

        assertAll(
            Executable { assertEquals(apiSpec.apiName, apiName) },
            Executable { assertEquals(apiSpec.specVersion, preReleaseVersion) },
            Executable { assertEquals(apiSpec.status, SpecStatus.PRE_RELEASE) }
        )
    }


    @Test
    fun `PUT active spec GET updated version`() {
        postApiSpec()

        val specBody = read("/request/spec-1b.json")

        putSpec(apiName, specVersion, specBody)

        val spec = getApiSpec(apiName, specVersion)

        assertThat(spec.specUrl).contains("open-api-new.json")
    }


    @Test
    fun `DELETE active spec`() {
        postApiSpec()

        delSpec(apiName, specVersion)

        assertFailsWith<IllegalStateException> {
            getApiSpec(apiName, specVersion)
        }
    }

    private fun postApiSpec() {
        val apiBody = read("/request/api-1a.json")
        postApi(apiBody)

        val specBody = read("/request/spec-1a.json")
        postSpec(apiName, specBody)
    }
}