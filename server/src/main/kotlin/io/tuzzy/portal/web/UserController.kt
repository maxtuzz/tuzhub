package io.tuzzy.portal.web

import io.tuzzy.portal.domain.User
import io.dinject.controller.Controller
import io.dinject.controller.Get
import io.dinject.controller.Path

@Controller
@Path("/user")
class UserController {
    @Get("/:name")
    fun sayHello(name: String): User {
        return User(name, "Just a test")
    }
}