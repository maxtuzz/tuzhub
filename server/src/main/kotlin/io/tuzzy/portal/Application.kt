package io.tuzzy.portal

import io.dinject.SystemContext
import io.dinject.controller.WebRoutes
import io.javalin.Javalin

fun main(args: Array<String>) {
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
        config.showJavalinBanner = false;
        config.logIfServerNotStarted = true;
    }

    return app.routes { routes.forEach(WebRoutes::registerRoutes) }
}