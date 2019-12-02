package io.tuzzy.portal.web

import io.javalin.Javalin
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
    fun sayHello() {
        val apiEntry = getApi("Max");

        println(apiEntry.toString());

        assertThat(apiEntry.name).contains("Max")
    }

    private fun getApi(s: String): ApiEntry {
        return Unirest.get("http://localhost:9091/api/${s}")
            .header("Content-Type", "application/json")
            .asObject(object : GenericType<ApiEntry>() {})
            .getBody()
    }
}