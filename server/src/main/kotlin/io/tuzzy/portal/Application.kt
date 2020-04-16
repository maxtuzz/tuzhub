package io.tuzzy.portal

import com.fasterxml.jackson.annotation.JsonInclude
import io.dinject.SystemContext
import io.dinject.controller.WebRoutes
import io.javalin.Javalin
import io.javalin.apibuilder.ApiBuilder.path
import io.javalin.core.util.Header
import io.javalin.plugin.json.JavalinJackson
import io.javalin.plugin.openapi.jackson.JacksonToJsonMapper.objectMapper

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

        // When in production mode, serve public files
        config.addStaticFiles("public")
    }

    app.before { ctx ->
        ctx.header(Header.ACCESS_CONTROL_ALLOW_ORIGIN, "*")
    }

    JavalinJackson.configure(
        objectMapper.setSerializationInclusion(JsonInclude.Include.NON_NULL)
    )

    return app.routes {
        path("/v1") {
            routes.forEach { it.registerRoutes() }
        }
    }
}
