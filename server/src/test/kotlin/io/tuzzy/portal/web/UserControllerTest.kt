package io.tuzzy.portal.web

import io.javalin.Javalin
import io.tuzzy.portal.domain.User
import io.tuzzy.portal.startServer
import kong.unirest.GenericType
import kong.unirest.Unirest
import org.junit.Test

class UserControllerTest {
    @Test
    fun sayHello() {
        val app: Javalin = startServer(9091)

        try {
            val user = getUser("Max");

            println(user.address);
        } finally {
            app.stop()
        }
    }

    private fun getUser(s: String): User {
        return Unirest.get("http://localhost:9091/user/${s}")
            .header("Content-Type", "application/json")
            .asObject(object : GenericType<User>() {})
            .getBody()
    }
}