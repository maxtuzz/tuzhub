package io.tuzzy.portal.api

import com.fasterxml.jackson.annotation.JsonProperty

data class ApiEntry(val displayName: String, val description: String?) : HalResourse() {
    // SpecUrl only used for initial creation request
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    var specUrl: String? = null
    var authEnabled: Boolean = false
    var name: String? = displayName.toLowerCase().replace(" ", "-")

    constructor(displayName: String, description: String? = null, specUrl: String?) : this(displayName, description) {
        this.specUrl = specUrl
    }

    // Add links here - api specs etc.
    init {
        val entryHref = "http://localhost:8090/api-entries/$name"

        self(entryHref)

        links.add("specs", "${entryHref}/specs")
        links.add("currentSpec", "${entryHref}/specs/current")
    }
}
