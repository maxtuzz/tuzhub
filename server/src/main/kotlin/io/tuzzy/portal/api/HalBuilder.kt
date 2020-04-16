package io.tuzzy.portal.api

import io.javalin.http.Context

/**
 * Generates links to REST resources
 *
 * TODO: Test how this works behind a load balancer
 *  - may need to use ctx to check for x_forwarded headers
 */
class HalBuilder(private val ctx: Context) {
    private val links: MutableMap<String, HalLink> = mutableMapOf()

    private val proto = if (ctx.protocol().endsWith("s")) {
        "https"
    } else {
        "http"
    }

    private val baseUrl = "${proto}://${ctx.host()}/v1"
    private val apiEntryBase = "${baseUrl}/api-entries"
    private fun specBase(apiName: String) = "${apiEntryBase}/${apiName}/specs"

    fun toContextPath(propertyName: String): HalBuilder {
        links[propertyName] = HalLink(ctx.fullUrl())

        return this
    }

    fun toApiEntryBase(): HalBuilder {
        links["apiEntries"] = HalLink(apiEntryBase)

        return this
    }

    fun toApiEntry(propertyName: String, apiName: String): HalBuilder {
        links[propertyName] = HalLink("${apiEntryBase}/$apiName")

        return this
    }

    fun toSpecMeta(propertyName: String, apiName: String): HalBuilder {
        links[propertyName] = HalLink(specBase(apiName))

        return this
    }

    fun toSpec(propertyName: String, apiName: String, specVersion: String): HalBuilder {
        links[propertyName] = HalLink("${specBase(apiName)}/$specVersion")

        return this
    }

    fun build(): MutableMap<String, HalLink> {
        return links
    }
}