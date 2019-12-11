package io.tuzzy.portal.domain

import io.tuzzy.portal.domain.query.QDApiEntry
import org.junit.jupiter.api.Test
import kotlin.test.assertEquals

class DApiEntryTest() {
    @Test
    fun insertFindDelete() {
        // Create new api entry
        val apiEntry = DApiEntry("My new API", "This api entry is for testing purposes")
        apiEntry.save()

        // Find by name
        val foundEntry = QDApiEntry()
            .name.eq("my-new-api")
            .findOne()

        // Test retrieved is the same
        assertEquals(foundEntry, apiEntry)

        // Delete
        apiEntry.delete();
    }
}