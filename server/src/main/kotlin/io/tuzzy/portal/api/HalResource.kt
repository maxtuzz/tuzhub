package io.tuzzy.portal.api

import com.fasterxml.jackson.annotation.JsonProperty

/**
 * Open class to supply all resources restful hateoas metadata
 */
abstract class HalResource<T>(links: Links = Links(), embedded: MutableMap<String, Any>? = mutableMapOf()) : Hal<T> {
    @JsonProperty("_links")
    var links = links

    @JsonProperty("_embedded")
    val embedded = embedded

    fun self(href: String): HalResource<T> {
        links.self = HalLink(href)

        return this
    }

    fun embed(propertyName: String, resource: Any): HalResource<T> {
        embedded?.set(propertyName, resource)

        return this
    }
}