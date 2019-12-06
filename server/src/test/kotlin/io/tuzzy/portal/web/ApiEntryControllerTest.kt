package io.tuzzy.portal.web

import io.tuzzy.portal.ResourceHelp.Companion.read
import io.tuzzy.portal.api.ApiEntry
import io.tuzzy.portal.api.ListResponse
import io.tuzzy.portal.domain.DApiEntry
import kong.unirest.GenericType
import kong.unirest.Unirest
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test

class ApiEntryControllerTest : WebTest() {
    @Test
    fun get() {
        val dApiEntry = DApiEntry("Test API", "API")
        dApiEntry.save()

        val apiName = "test-api"
        val apiEntry = getApi(apiName);

        assertThat(apiEntry.name).contains(apiName)
    }

    @Test
    fun create() {
        val bodyA = read("/request/api-1a.json")
        val bodyB = read("/request/api-2a.json")

        post(bodyA)
        post(bodyB)

        val apiEntries: ListResponse<ApiEntry> = getApiList()
        assertThat(apiEntries.content).hasSize(2)
    }

    private fun post(body: String) {
        val httpResponse = Unirest.post("http://localhost:${servicePort}/api-entries")
            .header("Content-Type", "application/json")
            .body(body)
            .asEmpty()

        if (!httpResponse.isSuccess) {
            throw IllegalStateException("Failed ingest request " + httpResponse.status);
        }
    }

    private fun getApi(apiName: String): ApiEntry {
        return Unirest.get("http://localhost:${servicePort}/api-entries/${apiName}")
            .header("Content-Type", "application/json")
            .asObject(object : GenericType<ApiEntry>() {})
            .getBody()
    }

    private fun getApiList(): ListResponse<ApiEntry> {
        return Unirest.get("http://localhost:${servicePort}/api-entries")
            .header("Content-Type", "application/json")
            .asObject(object : GenericType<ListResponse<ApiEntry>>() {})
            .getBody()
    }
}