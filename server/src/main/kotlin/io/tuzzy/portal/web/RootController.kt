package io.tuzzy.portal.web

import io.dinject.controller.Controller
import io.dinject.controller.Get
import io.dinject.controller.Path
import io.javalin.http.Context
import io.tuzzy.portal.api.HalBuilder
import io.tuzzy.portal.api.LinkResource
import io.tuzzy.portal.api.Links

@Controller
@Path("/")
class RootController {
    /**
     * Get meta.
     */
    @Get
    fun getMeta(ctx: Context): LinkResource {
        val links = Links()

        links.addAll {
            HalBuilder(ctx)
                .toApiEntryBase()
                .build()
        }

        return LinkResource(links)
    }
}