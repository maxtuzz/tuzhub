package io.tuzzy.portal.service

import io.javalin.http.ServiceUnavailableResponse
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import kotlin.test.assertFailsWith

internal class RemoteSpecServiceTest {
    private lateinit var remoteOpenAPIService: RemoteOpenAPIService

    val specUrl = "specs/petstore.yaml"

    @BeforeEach
    fun setup() {
        remoteOpenAPIService = RemoteOpenAPIService()
    }

    @Test
    fun `Get remote spec`() {
        val openAPI = remoteOpenAPIService.get(specUrl)
        assertThat(openAPI.info?.title?.toLowerCase()).contains("petstore")
    }

    @Test
    fun `Get remote spec mapped`() {
        val openAPI = remoteOpenAPIService.getJson(specUrl)

        assertThat(openAPI).isNotNull
    }

    @Test
    fun `Remote spec fails`() {
        assertFailsWith<ServiceUnavailableResponse> {
            remoteOpenAPIService.get("https://execute.order.66.com/api-spec")
        }
    }
}