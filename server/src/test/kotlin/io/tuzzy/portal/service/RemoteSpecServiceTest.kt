package io.tuzzy.portal.service

import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import java.net.UnknownHostException
import kotlin.test.assertFailsWith

internal class RemoteSpecServiceTest {
    private lateinit var remoteOpenAPIService: RemoteOpenAPIService

    val specUrl =
        "https://raw.githubusercontent.com/maxtuzz/tuzzy-dev-portal/master/server/src/test/resources/specs/petstore.yaml"

    @BeforeEach
    fun setup() {
        remoteOpenAPIService = RemoteOpenAPIService()
    }

    @Test
    fun `Get remote spec`() {
        val openAPI =
            remoteOpenAPIService.get(specUrl)

        assertThat(openAPI.info?.title?.toLowerCase()).contains("petstore")
    }

    @Test
    fun `Get remote spec mapped`() {
        val openAPI = remoteOpenAPIService.getJson(specUrl)

        assertThat(openAPI).isNotNull
    }

    @Test
    fun `Remote spec fails`() {
        assertFailsWith<UnknownHostException> {
            remoteOpenAPIService.get("https://execute.order.66.com/api-spec")
        }
    }
}