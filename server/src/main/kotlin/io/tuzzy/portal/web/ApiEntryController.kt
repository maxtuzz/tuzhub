package io.tuzzy.portal.web

import io.dinject.controller.*
import io.javalin.http.Context
import io.tuzzy.portal.api.ApiEntry
import io.tuzzy.portal.api.ListResponse
import io.tuzzy.portal.domain.DApiEntry

@Controller
@Path("/api-entries")
class ApiEntryController {
    @Get("/:name")
    fun get(name: String): ApiEntry {
        return ApiEntry(name, "test description")
    }

    @Get
    fun getAll(): ListResponse<ApiEntry> {
        val description = "test description"

        // Create some dummy objects
        val api = ApiEntry("Dog API", description)
        val api2 = ApiEntry("Cat API", description)

        return ListResponse(listOf(api, api2))
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