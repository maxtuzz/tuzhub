package io.tuzzy.portal.domain

import io.tuzzy.portal.domain.query.QDApiEntry
import org.assertj.core.api.Assertions.assertThat
import org.junit.Test

class DApiEntryTest() {
    @Test
    fun insertFindDelete() {
        // Create new api entry
        val apiEntry = DApiEntry("My new API", "This api entry is for testing purposes")
        apiEntry.save()

        // Find by name
        val foundEntry = QDApiEntry()
            .name.eq("My new API")
            .findOne()

        // Test retrieved is the same
        assertThat(foundEntry).isEqualTo(apiEntry)

        // Delete
        apiEntry.delete();
    }
}