package io.tuzzy.portal.api

import com.fasterxml.jackson.annotation.JsonProperty

data class ApiEntry(val name: String, val description: String?) : HalResourse() {
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    var specUrl: String? = null

    var authEnabled: Boolean = false

    constructor(name: String, description: String?, specUrl: String) : this(name, description) {
        this.specUrl = specUrl;
    }

    // Add links here - api specs etc.
    init {
        val entryHref = "http://localhost:8090/api-entries/$name"

        self(entryHref)

        links.add("specs", "${entryHref}/specs")
        links.add("currentSpec", "${entryHref}/specs/current")
    }
}
