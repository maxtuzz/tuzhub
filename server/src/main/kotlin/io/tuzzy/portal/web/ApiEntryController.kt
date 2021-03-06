package io.tuzzy.portal.web

import io.dinject.controller.*
import io.javalin.http.Context
import io.tuzzy.portal.api.ApiEntry
import io.tuzzy.portal.api.ListResponse
import io.tuzzy.portal.service.ApiEntryService

@Controller
@Path("/api-entries")
class ApiEntryController(private val apiEntryService: ApiEntryService) {
    /**
     * Get API entry by name.
     */
    @Get("/:name")
    fun get(name: String, ctx: Context): ApiEntry {
        val entry = apiEntryService.getByName(name)

        return ApiEntry(
            displayName = entry.displayName,
            description = entry.description
        ).withHal(ctx)
    }

    /**
     * Get all API entries.
     */
    @Get
    fun getAll(ctx: Context): ListResponse<ApiEntry> {
        return ListResponse(apiEntryService.getApiEntries(ctx))
    }

    /**
     * Create a new API entry.
     * All API entries have a spec attached to them. This operation
     * creates an initial spec based on supplied spec url"
     */
    @Post
    fun create(apiEntryReq: ApiEntry) {
        apiEntryService.createApiEntry(apiEntryReq)
    }

    /**
     * Update an API entry
     */
    @Put("/:name")
    fun update(name: String, apiEntry: ApiEntry) {
        apiEntryService.updateApiEntry(name, apiEntry)
    }

    /**
     * Delete an API entry
     */
    @Delete("/:name")
    fun delete(name: String) {
        apiEntryService.deleteByName(name)
    }
}