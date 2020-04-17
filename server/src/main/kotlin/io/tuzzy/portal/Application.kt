package io.tuzzy.portal

import com.fasterxml.jackson.annotation.JsonInclude
import io.dinject.SystemContext
import io.dinject.controller.WebRoutes
import io.javalin.Javalin
import io.javalin.apibuilder.ApiBuilder.path
import io.javalin.http.staticfiles.Location
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
        config.enableCorsForAllOrigins()
        config.showJavalinBanner = false
        config.logIfServerNotStarted = true

        // Serve static files when running in production
        if (System.getenv("PROD_MODE") == "true") {
            config.addStaticFiles("/app/public", Location.EXTERNAL)
        }
    }

    JavalinJackson.configure(
        objectMapper.setSerializationInclusion(JsonInclude.Include.NON_NULL)
    )

    return app.routes {
        path("/v1") {
            routes.forEach(WebRoutes::registerRoutes)
        }
    }
}
