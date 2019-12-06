package io.tuzzy.portal.service

import io.tuzzy.portal.api.ApiEntry
import io.tuzzy.portal.domain.DApiEntry
import io.tuzzy.portal.domain.DApiSpec
import io.tuzzy.portal.domain.query.QDApiEntry
import javax.inject.Singleton

@Singleton
class ApiEntryService {
    /**
     * Initial creation
     */
    fun createApiEntry(apiEntryReq: ApiEntry) {
        val apiEntry = saveApiEntry(apiEntryReq)

        // Create spec record associated with it
        DApiSpec(apiEntry = apiEntry, specVersion = "v1").save()
    }

    /**
     * Finds a single API entry by name
     */
    fun getByName(name: String): DApiEntry? {
        return QDApiEntry()
            .name.eq(name)
            .findOne()
    }

    /**
     * Returns list of organisations APIs
     */
    fun getApiEntries(): List<ApiEntry> {
        return QDApiEntry()
            .findList()
            .map { ApiEntry(it.displayName, it.description) }
    }

    /**
     * Updates an api entry record
     */
    fun updateApiEntry(name: String, apiEntryUpdate: ApiEntry) {
        getByName(name)

        // Save updated entry
        saveApiEntry(apiEntryUpdate)
    }

    // Saves/updates api entry
    private fun saveApiEntry(apiEntryReq: ApiEntry): DApiEntry {
        if (apiEntryReq.specUrl == null) {
            throw RuntimeException("Spec url not defined in request body")
        }

        // Create entry record
        val apiEntry = DApiEntry(apiEntryReq.displayName, apiEntryReq.description)
        apiEntry.save()

        return apiEntry
    }
}
