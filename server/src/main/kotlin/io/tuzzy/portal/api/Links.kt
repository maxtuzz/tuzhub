package io.tuzzy.portal.api

import com.fasterxml.jackson.annotation.JsonAnyGetter

data class Links(var self: HalLink = HalLink()) {
    private var links: MutableMap<String, HalLink> = mutableMapOf()

    fun add(propertyName: String, link: String) {
        links[propertyName] = HalLink(link)
    }

    /**
     * Will serialise the contents of links
     */
    @JsonAnyGetter
    fun flattenLinks(): Map<String, HalLink> {
        return links
    }
}