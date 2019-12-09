package io.tuzzy.portal.web

import io.dinject.controller.Controller
import io.dinject.controller.Get
import io.dinject.controller.Path
import io.dinject.controller.Post
import io.swagger.v3.parser.OpenAPIV3Parser
import io.tuzzy.portal.api.ApiSpec
import io.tuzzy.portal.service.ApiSpecService


@Controller
@Path("/api-entries/:apiName/specs")
class ApiSpecController(private val specService: ApiSpecService) {
    @Get("/:specVersion")
    fun get(apiName: String, specVersion: String): ApiSpec {
        // TODO haha just playing around
        val openAPI =
            OpenAPIV3Parser().read("https://raw.githubusercontent.com/OAI/OpenAPI-Specification/master/examples/v3.0/petstore.yaml")
        val specByVersion = specService.getSpecByVersion(apiName, specVersion)
        specByVersion.spec = openAPI

        return specByVersion
    }

    @Post
    fun create(apiName: String, apiSpec: ApiSpec) {
        specService.createSpecVersion(apiName, apiSpec)
    }
}