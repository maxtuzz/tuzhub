package io.tuzzy.portal.web

import io.tuzzy.portal.api.HalResourse
import kong.unirest.GenericType
import kong.unirest.Unirest
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test

class RootControllerTest : WebTest() {
    @Test
    fun getMeta() {
        val resp = fetchRoot()

        // FIXME
        assertThat(resp.links.flattenLinks()).isEmpty()
    }

    private fun fetchRoot(): HalResourse {
        return Unirest.get("http://localhost:${servicePort}/")
            .header("Content-Type", "application/json")
            .asObject(object : GenericType<HalResourse>() {})
            .getBody()
    }
}