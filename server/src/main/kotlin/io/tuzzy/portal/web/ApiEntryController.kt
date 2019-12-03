package io.tuzzy.portal.web

import io.dinject.controller.*
import io.tuzzy.portal.api.ApiEntry
import io.tuzzy.portal.api.ListResponse
import io.tuzzy.portal.service.ApiEntryService

@Controller
@Path("/api-entries")
class ApiEntryController(private val apiEntryService: ApiEntryService) {

    @Get("/:name")
    fun get(name: String): ApiEntry {
        return ApiEntry(name, "test description")
    }

    @Get
    fun getAll(): ListResponse<ApiEntry> {
        val apiEntries = apiEntryService.getApiEntries()

        return ListResponse(apiEntries)
    }

    @Post
    fun create(apiEntryReq: ApiEntry) {
        apiEntryService.createApiEntry(apiEntryReq)
    }

    @Put("/:name")
    fun update(name: String, apiEntry: ApiEntry) {
        TODO("Put not implemented yet for $name")
    }

    @Delete("/:name")
    fun delete(name: String) {
        TODO("Delete not implemented yet for $name")
    }
}