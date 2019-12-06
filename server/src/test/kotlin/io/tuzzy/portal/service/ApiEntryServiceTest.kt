package io.tuzzy.portal.service

import io.tuzzy.portal.api.ApiEntry
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import kotlin.test.assertFailsWith

class ApiEntryServiceTest {
    private lateinit var apiEntryService: ApiEntryService
    private lateinit var dummyEntry: ApiEntry

    @BeforeEach
    fun setup() {
        apiEntryService = ApiEntryService()
        dummyEntry = ApiEntry(
            displayName = "Jedi Order",
            specUrl = "https://execute.order.66.com/api-spec"
        )
    }

    @Test
    fun createAndFetchApiEntry() {
        apiEntryService.createApiEntry(dummyEntry)

        assertThat(apiEntryService.getApiEntries()).contains(dummyEntry)
    }


    @Test
    fun creationFails() {
        val dummyEntry2 = ApiEntry("General", "Kenobi")

        assertFailsWith<Exception> {
            apiEntryService.createApiEntry(dummyEntry2)
        }
    }
}