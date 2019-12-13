package io.tuzzy.portal.api

import io.javalin.http.Context

/**
 * Helper class for build common hateoas links based on javalin context
 */
class HalBuilder(ctx: Context) {
    private val links: MutableMap<String, HalLink> = mutableMapOf()

    private val proto = if (ctx.protocol().contains("s")) {
        "https"
    } else {
        "http"
    }

    private val baseUrl = "${proto}://${ctx.host()}"
    private val apiEntryBase = "${baseUrl}/api-entries"

    fun apiEntry(propertyName: String, apiName: String): HalBuilder {
        links[propertyName] = HalLink("${apiEntryBase}/$apiName")

        return this;
    }

    fun apiSpecs(propertyName: String, apiName: String): HalBuilder {
        links[propertyName] = HalLink("${apiEntryBase}/${apiName}/specs")

        return this
    }

    fun apiSpec(propertyName: String, apiName: String, specVersion: String): HalBuilder {
        links[propertyName] = HalLink("${apiEntryBase}/${apiName}/specs/$specVersion")

        return this
    }

    fun build(): MutableMap<String, HalLink> {
        return links
    }
}