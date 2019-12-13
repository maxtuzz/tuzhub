package io.tuzzy.portal.web

import io.dinject.controller.*
import io.javalin.http.Context
import io.tuzzy.portal.api.ApiEntry
import io.tuzzy.portal.api.HalLink
import io.tuzzy.portal.api.Links
import io.tuzzy.portal.api.ListResponse
import io.tuzzy.portal.service.ApiEntryService

@Controller
@Path("/api-entries")
class ApiEntryController(private val apiEntryService: ApiEntryService) {

    @Get("/:name")
    fun get(name: String, ctx: Context): ApiEntry {
        val entry = apiEntryService.getByName(name)

        return ApiEntry(
            displayName = entry.displayName,
            description = entry.description
        ).withHal(ctx)
    }

    @Get
    fun getAll(ctx: Context): ListResponse<ApiEntry> {
        val apiEntries = apiEntryService.getApiEntries(ctx)

        val self = HalLink("http://localhost:9080/api-entries")

        return ListResponse(
            content = apiEntries,
            links = Links(self)
        )
    }

    @Post
    fun create(apiEntryReq: ApiEntry) {
        apiEntryService.createApiEntry(apiEntryReq)
    }

    @Put("/:name")
    fun update(name: String, apiEntry: ApiEntry) {
        apiEntryService.updateApiEntry(name, apiEntry)
    }

    @Delete("/:name")
    fun delete(name: String) {
        apiEntryService.deleteByName(name)
    }
}