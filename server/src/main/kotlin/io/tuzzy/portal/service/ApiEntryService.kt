package io.tuzzy.portal.service

import io.javalin.http.BadRequestResponse
import io.javalin.http.Context
import io.javalin.http.NotFoundResponse
import io.tuzzy.portal.api.ApiEntry
import io.tuzzy.portal.api.ApiSpec
import io.tuzzy.portal.domain.DApiEntry
import io.tuzzy.portal.domain.DApiSpec
import io.tuzzy.portal.domain.SpecStatus
import io.tuzzy.portal.domain.query.QDApiEntry
import io.tuzzy.portal.domain.query.QDApiSpec
import javax.inject.Singleton

@Singleton
class ApiEntryService {
    /**
     * Initial creation of api and first spec
     */
    fun createApiEntry(apiEntryReq: ApiEntry) {
        if (apiEntryReq.specUrl == null && !apiEntryReq.manuallyConfigured) {
            throw BadRequestResponse("Spec url not defined in request body, and manual configuration is set to off")
        }

        // Create entry record
        val apiEntry = DApiEntry(apiEntryReq.displayName, apiEntryReq.description)
        apiEntry.save()

        // Create initial spec record associated with it
        DApiSpec(
            apiEntry = apiEntry,
            status = SpecStatus.ACTIVE,
            specVersion = "v1",
            specUrl = apiEntryReq.specUrl
        ).save()
    }

    /**
     * Finds a single API entry by name
     */
    fun getByName(name: String): DApiEntry {
        return QDApiEntry()
            .name.eq(name)
            .findOne() ?: throw NotFoundResponse("nawt found")
    }

    /**
     * Returns list of organisations APIs
     */
    fun getApiEntries(): MutableList<DApiEntry> {
        return QDApiEntry()
            .findList()
    }

    /**
     * Returns API entries in a restful context
     */
    fun getApiEntries(ctx: Context): List<ApiEntry> {
        return getApiEntries().map {
            ApiEntry(it.displayName, it.description, it.manuallyConfigured).withHal(ctx)
        }
    }

    /**
     * Updates an api entry record
     */
    fun updateApiEntry(name: String, apiUpdate: ApiEntry) {
        val rows = QDApiEntry()
            .name.eq(name)
            .asUpdate()
            .set("display_name", apiUpdate.displayName)
            .set("name", apiUpdate.displayName.toLowerCase().replace(" ", "-"))
            .set("description", apiUpdate.description)
            .update()

        if (rows < 1) {
            throw NotFoundResponse("Api entry not found; no api updated")
        }
    }

    /**
     * Delete api entry by name and associated specs
     */
    fun deleteByName(api: String) {
        val entry = QDApiEntry()
            .name.eq(api)
            .findOne() ?: throw NotFoundResponse("User not found")

        QDApiSpec()
            .apiEntry
            .id.eq(entry.id)
            .delete()

        entry.delete()
    }
}
