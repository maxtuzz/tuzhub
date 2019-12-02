package io.tuzzy.portal.web

import io.dinject.controller.*
import io.swagger.parser.OpenAPIParser
import io.swagger.v3.oas.models.OpenAPI
import io.swagger.v3.parser.OpenAPIV3Parser
import io.tuzzy.portal.api.ApiEntry

@Controller
@Path("/api")
class ApiEntryController {
    @Get("/:name")
    fun getApi(name: String): ApiEntry {
        return ApiEntry(name, "test description")
    }

    @Post
    fun create(apiEntry: ApiEntry) {
        TODO()
    }

    @Put("/:name")
    fun update(apiEntry: ApiEntry, name: String) {
        TODO("Put not implemented yet for $name")
    }

    @Delete("/:name")
    fun delete(name: String) {
        TODO("Delete not implemented yet for $name")
    }
}