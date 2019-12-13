package io.tuzzy.portal.api

import io.javalin.http.Context
import io.swagger.v3.oas.models.OpenAPI
import io.tuzzy.portal.domain.SpecStatus

data class ApiSpec(
    val apiName: String? = null,
    val specVersion: String = "v1",
    val status: SpecStatus,
    val specUrl: String? = null,
    var spec: OpenAPI? = null
) :
    HalResourse() {
    fun withHal(ctx: Context): ApiSpec {
        if (apiName == null) throw IllegalStateException("Api name is not initiated, cannot build hal")

        links.addAll {
            HalBuilder(ctx)
                .apiSpec("self", apiName, specVersion)
                .apiEntry("api", apiName)
                .build()
        }

        return this
    }
}