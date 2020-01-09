package io.tuzzy.portal.api

import com.fasterxml.jackson.annotation.JsonProperty

class ListResponse<T>(val content: List<T>) : HalResource() {
    constructor(content: List<T>, @JsonProperty("_links") links: Links) : this(content) {
        this.links = links
    }
}