package io.tuzzy.portal.web

import io.javalin.Javalin
import io.tuzzy.portal.ResourceHelp.Companion.read
import io.tuzzy.portal.api.ApiEntry
import io.tuzzy.portal.api.ListResponse
import io.tuzzy.portal.startServer
import kong.unirest.GenericType
import kong.unirest.Unirest
import org.assertj.core.api.Assertions.assertThat
import org.junit.After
import org.junit.Before
import org.junit.Test

class ApiEntryControllerTest {
    lateinit var app: Javalin

    @Before
    fun setup() {
        app = startServer(9091)
    }

    @After
    fun stopServer() {
        app.stop()
    }

    @Test
    fun get() {
        val apiEntry = getApi("Max");

        assertThat(apiEntry.name).contains("Max")
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
        val httpResponse = Unirest.post("http://localhost:9091/api-entries")
            .header("Content-Type", "application/json")
            .body(body)
            .asEmpty()

        if (!httpResponse.isSuccess) {
            throw IllegalStateException("Failed ingest request " + httpResponse.status);
        }
    }

    private fun getApi(apiName: String): ApiEntry {
        return Unirest.get("http://localhost:9091/api-entries/${apiName}")
            .header("Content-Type", "application/json")
            .asObject(object : GenericType<ApiEntry>() {})
            .getBody()
    }

    private fun getApiList(): ListResponse<ApiEntry> {
        return Unirest.get("http://localhost:9091/api-entries")
            .header("Content-Type", "application/json")
            .asObject(object : GenericType<ListResponse<ApiEntry>>() {})
            .getBody()
    }
}