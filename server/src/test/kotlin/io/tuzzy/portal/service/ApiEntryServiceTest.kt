package io.tuzzy.portal.service

import io.tuzzy.portal.api.ApiEntry
import org.assertj.core.api.Assertions.assertThat
import org.junit.Before
import org.junit.Test
import kotlin.test.assertFailsWith

class ApiEntryServiceTest {
    lateinit var apiEntryService: ApiEntryService
    lateinit var dummyEntry: ApiEntry

    @Before
    fun setup() {
        apiEntryService = ApiEntryService()
        dummyEntry = ApiEntry("Hello", "There", "https://execute.order.66.com/api-spec")
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