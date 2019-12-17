package io.tuzzy.portal.api

class ListResponse<T>(val content: List<T>) : HalResource() {
    constructor(content: List<T>, links: Links) : this(content) {
        this.links = links
    }
}