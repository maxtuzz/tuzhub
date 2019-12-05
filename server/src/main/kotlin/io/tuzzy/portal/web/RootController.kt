package io.tuzzy.portal.web

import io.dinject.controller.Controller
import io.dinject.controller.Get
import io.dinject.controller.Path
import io.tuzzy.portal.api.HalLink
import io.tuzzy.portal.api.HalResourse
import io.tuzzy.portal.api.Links

@Controller
@Path("/")
class RootController {
    @Get
    fun getMeta(): HalResourse {
        val halLinks = Links(self = HalLink("http//localhost:8090"))

        // Root hateoas links
        halLinks.add("apiEntries", "http://localhost:8090/api-entries")

        return HalResourse (
            links = halLinks
        )
    }
}