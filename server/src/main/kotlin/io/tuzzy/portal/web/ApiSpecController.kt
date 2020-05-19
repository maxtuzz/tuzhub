package io.tuzzy.portal.web

import io.dinject.controller.*
import io.javalin.http.Context
import io.tuzzy.portal.api.ApiSpec
import io.tuzzy.portal.api.HalBuilder
import io.tuzzy.portal.api.LinkResource
import io.tuzzy.portal.api.Links
import io.tuzzy.portal.service.ApiSpecService

@Controller
@Path("/api-entries/:apiName/specs")
class ApiSpecController(private val specService: ApiSpecService) {
    /**
     * Get spec metadata.
     * Returns collection of hateoas links resolving to all available specs for an api entry
     */
    @Get
    fun getMeta(apiName: String, ctx: Context): LinkResource {
        val links = Links()
        val specVersion = "active"

        // Create hal link builder with self path and active spec defined
        val linkBuilder = HalBuilder(ctx)
            .toSpec(
                propertyName = specVersion,
                apiName = apiName,
                specVersion = specVersion
            )

        // Find tuzzy specs and create a reference link to them
        specService.getAll(apiName).forEach {
            linkBuilder.toSpec(it.specVersion, apiName, it.specVersion)
        }

        links.addAll(linkBuilder.build())

        return LinkResource(links).withHal(ctx)
    }


    /**
     * Get API spec.
     * Version in this context is the version of the maintained spec in tuzzy portal
     */
    @Get("/:specVersion")
    fun get(apiName: String, specVersion: String, ctx: Context): ApiSpec {
        val specByVersion = specService.getSpecByVersion(apiName, specVersion)

        return specByVersion
            .withHal(ctx)
    }

    /**
     * Create a new API spec.
     */
    @Post
    fun create(apiName: String, apiSpec: ApiSpec) {
        specService.createSpecVersion(apiName, apiSpec)
    }

    /**
     * Update an API spec.
     */
    @Put("/:specVersion")
    fun update(apiName: String, specVersion: String, apiSpec: ApiSpec) {
        specService.updateSpec(apiName, specVersion, apiSpec)
    }

    /**
     * Delete an API spec.
     */
    @Delete("/:specVersion")
    fun delete(apiName: String, specVersion: String) {
        specService.deleteSpec(apiName, specVersion)
    }
}