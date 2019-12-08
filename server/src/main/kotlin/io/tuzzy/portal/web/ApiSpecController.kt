package io.tuzzy.portal.web

import io.dinject.controller.Controller
import io.dinject.controller.Get
import io.dinject.controller.Path
import io.tuzzy.portal.api.ApiSpec
import io.tuzzy.portal.domain.SpecStatus

@Controller
@Path("/api-entries/:name/specs")
class ApiSpecController() {
    @Get("/:specVersion")
    fun get(name: String, specVersion: String): ApiSpec {
        if (specVersion.toLowerCase() == "active") {
            TODO("Get active spec based on spec status")
        }

        return ApiSpec(apiName = name, specVersion = specVersion, status = SpecStatus.ACTIVE)
    }
}