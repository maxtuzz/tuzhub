package io.tuzzy.portal.service

import io.javalin.http.Context
import io.javalin.http.NotFoundResponse
import io.swagger.v3.parser.OpenAPIV3Parser
import io.tuzzy.portal.api.ApiEntry
import io.tuzzy.portal.domain.DApiEntry
import io.tuzzy.portal.domain.DApiSpec
import io.tuzzy.portal.domain.SpecStatus
import io.tuzzy.portal.domain.query.QDApiEntry
import io.tuzzy.portal.domain.query.QDApiSpec
import javax.inject.Singleton

@Singleton
class ApiEntryService(private val remoteOpenAPIService: RemoteOpenAPIService) {
    /**
     * Initial creation of api and first spec
     */
    fun createApiEntry(apiEntryReq: ApiEntry) {
        val jsonSpec: Map<String, Any> = (
                when {
                    apiEntryReq.specUrl != null -> {
                        remoteOpenAPIService.getJson(apiEntryReq.specUrl!!)
                    }
                    apiEntryReq.fullSpec != null -> {
                        val validateContent = OpenAPIV3Parser().readContents(SpecMapper.toString(apiEntryReq.fullSpec!!))
                        SpecMapper.toJson(validateContent.openAPI)
                    }
                    else -> {
                        null
                    }
                }) ?: throw IllegalStateException("Failed to compute spec in json format")

        // Create entry record
        val apiEntry = DApiEntry(apiEntryReq.displayName, apiEntryReq.description, apiEntryReq.dynamicConf)
        apiEntry.save()

        // Create initial spec record associated with it
        DApiSpec(
            apiEntry = apiEntry,
            status = SpecStatus.ACTIVE,
            specVersion = "v1",
            specUrl = apiEntryReq.specUrl,
            spec = jsonSpec
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
            ApiEntry(it.displayName, it.description, it.dynamicConf).withHal(ctx)
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
