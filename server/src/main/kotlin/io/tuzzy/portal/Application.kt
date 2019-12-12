package io.tuzzy.portal

import com.fasterxml.jackson.annotation.JsonInclude
import io.dinject.SystemContext
import io.dinject.controller.WebRoutes
import io.javalin.Javalin
import io.javalin.http.Context
import io.javalin.http.NotFoundResponse
import io.javalin.plugin.json.JavalinJackson
import io.javalin.plugin.openapi.jackson.JacksonToJsonMapper.objectMapper
import io.tuzzy.portal.api.ApiSpec

fun main() {
    startServer(8090)
}

fun startServer(port: Int): Javalin {
    return create(SystemContext.getBeans(WebRoutes::class.java))
        .start(port)
}

/**
 * Creates javalin server with list of routes
 */
fun create(routes: List<WebRoutes>): Javalin {
    val app = Javalin.create() { config ->
        config.showJavalinBanner = false
        config.logIfServerNotStarted = true
    }

    JavalinJackson.configure(
        objectMapper.setSerializationInclusion(JsonInclude.Include.NON_NULL)
    )

    return app.routes { routes.forEach(WebRoutes::registerRoutes) }
}
