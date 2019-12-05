package io.tuzzy.portal.web

import io.javalin.Javalin
import io.tuzzy.portal.api.HalResourse
import io.tuzzy.portal.startServer
import kong.unirest.GenericType
import kong.unirest.Unirest
import org.assertj.core.api.Assertions.assertThat
import org.junit.After
import org.junit.Before
import org.junit.Test

class RootControllerTest {
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
    fun getMeta() {
        val resp = fetchRoot()

        // FIXME
        assertThat(resp.links.flattenLinks()).isEmpty()
    }

    private fun fetchRoot(): HalResourse {
        return Unirest.get("http://localhost:9091/")
            .header("Content-Type", "application/json")
            .asObject(object : GenericType<HalResourse>() {})
            .getBody()
    }
}