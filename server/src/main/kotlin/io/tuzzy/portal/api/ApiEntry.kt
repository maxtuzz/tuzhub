package io.tuzzy.portal.api

import com.fasterxml.jackson.annotation.JsonProperty
import io.javalin.http.Context

data class ApiEntry(val displayName: String, val description: String?, val manuallyConfigured: Boolean = false) :
    HalResourse() {
    // SpecUrl only used for initial creation request
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    var specUrl: String? = null
    var authEnabled: Boolean = false
    var name: String = displayName.toLowerCase().replace(" ", "-")

    var fullSpec: Map<String, Any>? = null

    constructor(displayName: String, description: String? = null, specUrl: String?) : this(displayName, description) {
        this.specUrl = specUrl
    }

    fun withHal(ctx: Context): ApiEntry {
        links.addAll {
            HalBuilder(ctx)
                .apiEntry("self", apiName = name)
                .apiSpecs("specs", apiName = name)
                .apiSpec("activeSpec", apiName = name, specVersion = "active")
                .build()
        }

        return this
    }
}
