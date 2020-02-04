package io.tuzzy.portal.service

import io.javalin.http.BadRequestResponse
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
        apiEntryService = ApiEntryService(RemoteOpenAPIService())
        dummyEntry = ApiEntry(
            displayName = "Jedi Order",
            specUrl = "specs/petstore.yaml"
        )
    }

    @AfterEach
    fun deleteDb() {
        QDApiSpec().delete()
        QDApiEntry().delete()
    }

    @Test
    fun `Create and fetch API entry`() {
        apiEntryService.createApiEntry(dummyEntry)

        assertThat(apiEntryService.getApiEntries().map { it.name }).contains("jedi-order")
    }

    @Test
    fun `Create and delete API entry`() {
        apiEntryService.createApiEntry(dummyEntry)

        assertThat(apiEntryService.getApiEntries()).hasSize(1)

        apiEntryService.deleteByName("jedi-order")

        assertThat(apiEntryService.getApiEntries()).hasSize(0)
    }

    @Test
    fun `Creation of API spec fails with no spec`() {
        val dummyEntry2 = ApiEntry("General", "Kenobi")

        assertFailsWith<BadRequestResponse> {
            apiEntryService.createApiEntry(dummyEntry2)
        }
    }
}