package io.tuzzy.portal.api

import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonProperty


data class ApiEntry(val name: String, val description: String?) {
    // Used for initial creation request payload only
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    var specUrl: String? = ""

    var authEnabled: Boolean = false
}