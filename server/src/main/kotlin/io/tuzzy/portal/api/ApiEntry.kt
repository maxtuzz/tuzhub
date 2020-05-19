package io.tuzzy.portal.api

import com.fasterxml.jackson.annotation.JsonProperty
import io.javalin.http.Context
import io.tuzzy.portal.util.NameFormatter

data class ApiEntry(val displayName: String, val description: String?, var dynamicConf: Boolean = true) :
    HalResource<ApiEntry>() {
    // SpecUrl only used for initial creation request
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    var specUrl: String? = null
    var authEnabled: Boolean = false

    // Format name based on display name
    var name: String = NameFormatter.format(displayName)

    var fullSpec: Map<String, Any>? = null

    constructor(displayName: String, description: String? = null, specUrl: String?) : this(displayName, description) {
        this.specUrl = specUrl
    }

    override fun withHal(ctx: Context): ApiEntry {
        links.addAll {
            HalBuilder(ctx)
                .toApiEntry("self", apiName = name)
                .toSpecMeta("specs", apiName = name)
                .toSpec("activeSpec", apiName = name, specVersion = "active")
                .build()
        }

        return this
    }
}
