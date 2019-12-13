package io.tuzzy.portal.web

import io.dinject.controller.*
import io.javalin.http.Context
import io.tuzzy.portal.api.ApiSpec
import io.tuzzy.portal.api.HalLink
import io.tuzzy.portal.api.HalResourse
import io.tuzzy.portal.api.Links
import io.tuzzy.portal.service.ApiSpecService


@Controller
@Path("/api-entries/:apiName/specs")
class ApiSpecController(private val specService: ApiSpecService) {
    @Get
    fun getMeta(apiName: String, ctx: Context): HalResourse {
        val links = Links(HalLink(ctx.fullUrl()))
        val discoveryLinks: MutableMap<String, HalLink> = mutableMapOf()

        specService.getAll(apiName).forEach {
            discoveryLinks[it.specVersion ?: "undefined"] =
                HalLink("${ctx.fullUrl()}/${it.specVersion}")
        }

        links.addAll(discoveryLinks)

        return HalResourse(links)
    }

    @Get("/:specVersion")
    fun get(apiName: String, specVersion: String, ctx: Context): ApiSpec {
        return specService.getSpecByVersion(apiName, specVersion)
            .withHal(ctx)
    }

    @Post
    fun create(apiName: String, apiSpec: ApiSpec) {
        specService.createSpecVersion(apiName, apiSpec)
    }

    @Put("/:specVersion")
    fun update(apiName: String, specVersion: String, apiSpec: ApiSpec) {
        specService.updateSpec(apiName, specVersion, apiSpec)
    }

    @Delete("/:specVersion")
    fun delete(apiName: String, specVersion: String) {
        specService.deleteSpec(apiName, specVersion)
    }
}