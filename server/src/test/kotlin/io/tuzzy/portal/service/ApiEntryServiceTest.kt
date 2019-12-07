package io.tuzzy.portal.service

import io.tuzzy.portal.api.ApiEntry
import io.tuzzy.portal.domain.query.QDApiEntry
import io.tuzzy.portal.domain.query.QDApiSpec
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.AfterEach
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

    @AfterEach
    fun deleteDb() {
        QDApiSpec().delete()
        QDApiEntry().delete()
    }

    @Test
    fun createAndFetchApiEntry() {
        apiEntryService.createApiEntry(dummyEntry)

        assertThat(apiEntryService.getApiEntries()).contains(dummyEntry)
    }

    @Test
    fun deleteByName() {
        apiEntryService.createApiEntry(dummyEntry)

        assertThat(apiEntryService.getApiEntries()).hasSize(1)

        apiEntryService.deleteByName("jedi-order")

        assertThat(apiEntryService.getApiEntries()).hasSize(0)
    }

    @Test
    fun creationFails() {
        val dummyEntry2 = ApiEntry("General", "Kenobi")

        assertFailsWith<Exception> {
            apiEntryService.createApiEntry(dummyEntry2)
        }
    }
}