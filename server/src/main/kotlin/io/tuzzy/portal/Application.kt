package io.tuzzy.portal

import io.dinject.SystemContext
import io.dinject.controller.WebRoutes
import io.javalin.Javalin

fun main(args: Array<String>) {
    val webRoutes = SystemContext.getBeans(WebRoutes::class.java)

    create(webRoutes)
        .start(8090);
}

/**
 * Can start up javalin server for testing
 */
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

    app.get("/") { ctx -> ctx.result("Welcome to the tuzzy portal api!") }

    return app.routes { routes.forEach(WebRoutes::registerRoutes) }
}