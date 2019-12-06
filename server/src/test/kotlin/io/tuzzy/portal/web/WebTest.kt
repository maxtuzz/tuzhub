package io.tuzzy.portal.web

import io.javalin.Javalin
import io.tuzzy.portal.startServer
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.BeforeAll

/**
 * Web test will start a test javalin server before each test class and stop it afterwards
 */
open class WebTest {
    companion object {
        lateinit var app: Javalin
        const val servicePort: Int = 9091

        @BeforeAll
        @JvmStatic
        fun setup() {
            app = startServer(servicePort)
        }

        @AfterAll
        @JvmStatic
        fun stopServer() {
            app.stop()
        }
    }
}