package io.tuzzy.portal.api

import io.tuzzy.portal.domain.SpecStatus

data class ApiSpec(
    val apiName: String? = null,
    val specVersion: String = "v1",
    val status: SpecStatus,
    val specUrl: String? = null,
    val openApi: Map<String, Any>? = mutableMapOf()
) :
    HalResourse() {
    init {
        val apiHref = "http://localhost:8090/api-entries/$apiName"
        val entryHref = "$apiHref/specs/$specVersion"

        self(entryHref)

        links.add("api", apiHref)
    }
}