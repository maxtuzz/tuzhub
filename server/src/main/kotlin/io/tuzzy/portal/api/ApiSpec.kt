package io.tuzzy.portal.api

import io.javalin.http.Context
import io.tuzzy.portal.domain.SpecStatus

data class ApiSpec(
    val apiName: String? = null,
    val specVersion: String = "v1",
    val status: SpecStatus,
    val specUrl: String? = null,
    var spec: Map<String, Any>? = null
) : HalResource() {
    fun withHal(ctx: Context): ApiSpec {
        if (apiName == null) throw IllegalStateException("Api name is not initiated, cannot build hal")

        links.addAll {
            HalBuilder(ctx)
                .toSpec("self", apiName, specVersion)
                .toApiEntry("api", apiName)
                .build()
        }

        return this
    }
}