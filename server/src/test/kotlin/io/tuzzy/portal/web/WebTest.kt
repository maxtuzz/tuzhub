package io.tuzzy.portal.web

import io.javalin.Javalin
import io.tuzzy.portal.api.ApiEntry
import io.tuzzy.portal.api.ListResponse
import io.tuzzy.portal.domain.query.QDApiEntry
import io.tuzzy.portal.domain.query.QDApiSpec
import io.tuzzy.portal.startServer
import kong.unirest.GenericType
import kong.unirest.Unirest
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.BeforeAll

/**
 * Web test will start a test javalin server before each test class and stop it afterwards
 */
open class WebTest {
    private val baseUrl = "http://localhost:$servicePort"

    @AfterEach
    fun tearDown() {
        QDApiSpec().delete()
        QDApiEntry().delete()
    }

    companion object {
        lateinit var app: Javalin
        const val servicePort: Int = 9091

        @BeforeAll
        @JvmStatic
        fun setup() {
            println("Starting server on port $servicePort")
            app = startServer(servicePort)
        }

        @AfterAll
        @JvmStatic
        fun stopServer() {
            app.stop()
        }
    }

    fun delApi(apiEntry: String) {
        val httpResponse = Unirest
            .delete("$baseUrl/api-entries/$apiEntry")
            .header("Content-Type", "application/json")
            .asEmpty()

        if (!httpResponse.isSuccess) {
            throw IllegalStateException("Failed ingest request ${httpResponse.status}")
        }
    }

    fun putApi(apiEntry: String, body: String) {
        val httpResponse = Unirest
            .put("$baseUrl/api-entries/$apiEntry")
            .header("Content-Type", "application/json")
            .body(body)
            .asEmpty()

        if (!httpResponse.isSuccess) {
            throw IllegalStateException("Failed ingest request ${httpResponse.status}");
        }
    }

    fun postApi(body: String) {
        val httpResponse = Unirest.post("$baseUrl/api-entries")
            .header("Content-Type", "application/json")
            .body(body)
            .asEmpty()

        if (!httpResponse.isSuccess) {
            throw IllegalStateException("Failed ingest request ${httpResponse.status}")
        }
    }

    fun getApi(apiName: String): ApiEntry {
        return Unirest.get("$baseUrl/api-entries/$apiName")
            .header("Content-Type", "application/json")
            .asObject(object : GenericType<ApiEntry>() {})
            .getBody()
    }

    fun getApiList(): ListResponse<ApiEntry> {
        return Unirest.get("$baseUrl/api-entries")
            .header("Content-Type", "application/json")
            .asObject(object : GenericType<ListResponse<ApiEntry>>() {})
            .getBody()
    }

    fun postSpec(apiName: String, body: String) {
        val httpResponse = Unirest.post("$baseUrl/api-entries/$apiName/specs")
            .header("Content-Type", "application/json")
            .body(body)
            .asEmpty()

        if (!httpResponse.isSuccess) {
            throw IllegalStateException("Failed ingest request ${httpResponse.status}")
        }
    }
}