package io.tuzzy.portal.web

import io.javalin.Javalin
import io.javalin.http.NotFoundResponse
import io.tuzzy.portal.api.ApiEntry
import io.tuzzy.portal.api.ApiSpec
import io.tuzzy.portal.api.ListResponse
import io.tuzzy.portal.domain.query.QDApiEntry
import io.tuzzy.portal.domain.query.QDApiSpec
import io.tuzzy.portal.startServer
import kong.unirest.GenericType
import kong.unirest.HttpResponse
import kong.unirest.Unirest
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.BeforeEach
import org.slf4j.LoggerFactory

/**
 * Web test will start a test javalin server before each test class and stop it afterwards
 */
open class WebTest {
    private val logger = LoggerFactory.getLogger(javaClass)
    val baseUrl = "http://localhost:$servicePort/v1"

    @BeforeEach
    fun tearDown() {
        QDApiSpec().delete()
        QDApiEntry().delete()

        Thread.sleep(200)
    }

    companion object {
        lateinit var app: Javalin
        const val servicePort: Int = 9091
        val contentType = "application/json"

        @BeforeAll
        @JvmStatic
        fun setup() {
            println("Starting server on port $servicePort")
            app = startServer(servicePort)

            Thread.sleep(1000)
        }

        @AfterAll
        @JvmStatic
        fun stopServer() {
            Thread.sleep(1000)
            app.stop()
        }
    }

    fun delApi(apiEntry: String) {
        val httpResponse = Unirest
            .delete("$baseUrl/api-entries/$apiEntry")
            .header("Content-Type", contentType)
            .asEmpty()

        handleErrors(httpResponse)
    }

    fun putApi(apiEntry: String, body: String) {
        val httpResponse = Unirest
            .put("$baseUrl/api-entries/$apiEntry")
            .header("Content-Type", contentType)
            .body(body)
            .asEmpty()

        handleErrors(httpResponse)
    }

    fun postApi(body: String) {
        val httpResponse = Unirest.post("$baseUrl/api-entries")
            .header("Content-Type", contentType)
            .body(body)
            .asEmpty()

        handleErrors(httpResponse)
    }

    fun getApi(apiName: String): ApiEntry {
        return Unirest.get("$baseUrl/api-entries/$apiName")
            .header("Content-Type", contentType)
            .asObject(object : GenericType<ApiEntry>() {})
            .getBody()
    }

    fun getApiList(): ListResponse<ApiEntry> {
        return Unirest.get("$baseUrl/api-entries")
            .header("Content-Type", contentType)
            .asObject(object : GenericType<ListResponse<ApiEntry>>() {})
            .getBody()
    }

    fun postSpec(apiName: String, body: String) {
        val httpResponse = Unirest.post("$baseUrl/api-entries/$apiName/specs")
            .header("Content-Type", contentType)
            .body(body)
            .asEmpty()

        handleErrors(httpResponse)
    }

    fun putSpec(apiName: String, specVersion: String, body: String) {
        val httpResponse = Unirest.put("$baseUrl/api-entries/$apiName/specs/$specVersion")
            .header("Content-Type", contentType)
            .body(body)
            .asEmpty()

        handleErrors(httpResponse)
    }

    fun delSpec(apiName: String, specVersion: String) {
        val httpResponse = Unirest
            .delete("$baseUrl/api-entries/$apiName/specs/$specVersion")
            .header("Content-Type", contentType)
            .asEmpty()

        handleErrors(httpResponse)
    }

    fun getApiSpec(apiName: String, specVersion: String): ApiSpec {
        return Unirest.get("$baseUrl/api-entries/$apiName/specs/$specVersion")
            .header("Content-Type", contentType)
            .asObject(object : GenericType<ApiSpec>() {})
            .getBody()
    }

    private fun handleErrors(httpResponse: HttpResponse<Any>) {
        if (httpResponse.status == 404) {
            throw NotFoundResponse("Not found")
        }


        if (!httpResponse.isSuccess) {
            throw IllegalStateException("Failed request ${httpResponse.status}")
        }
    }
}