package io.tuzzy.portal.web

import io.javalin.Javalin
import io.tuzzy.portal.ResourceHelp
import io.tuzzy.portal.api.ApiEntry
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
        val apiEntry = getApiEntry("Max");

        assertThat(apiEntry.name).contains("Max")
    }

    @Test
    fun create() {
        val bodyA = ResourceHelp.read("/request/api-1a.json")

        println(bodyA)
    }

    private fun getApiEntry(s: String): ApiEntry {
        return Unirest.get("http://localhost:9091/api-entries/${s}")
            .header("Content-Type", "application/json")
            .asObject(object : GenericType<ApiEntry>() {})
            .getBody()
    }
}