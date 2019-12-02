package io.tuzzy.portal.api

data class ApiEntry(val name: String, val description: String?) {
    var specificationUrl: String? = ""
    var authEnabled: Boolean = false
}