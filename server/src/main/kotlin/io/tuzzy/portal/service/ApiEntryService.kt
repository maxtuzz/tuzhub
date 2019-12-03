package io.tuzzy.portal.service

import io.tuzzy.portal.api.ApiEntry
import io.tuzzy.portal.domain.DApiEntry
import io.tuzzy.portal.domain.DApiSpec
import io.tuzzy.portal.domain.query.QDApiEntry
import javax.inject.Singleton

@Singleton
class ApiEntryService {
    fun createApiEntry(apiEntryReq: ApiEntry) {
        if (apiEntryReq.specUrl == null) {
            throw Exception("Spec url not defined in request body")
        }

        // Create entry record
        val apiEntry = DApiEntry(apiEntryReq.name, apiEntryReq.description)
        apiEntry.save()

        // Create spec record associated with it
        val apiSpec = DApiSpec(apiEntry, "v1", null, true)
        apiSpec.save()
    }

    /**
     * Returns list of organisations APIs
     */
    fun getApiEntries(): List<ApiEntry> {
        return QDApiEntry()
            .findList()
            .map { entry -> ApiEntry(entry.name, entry.description) }
    }
}