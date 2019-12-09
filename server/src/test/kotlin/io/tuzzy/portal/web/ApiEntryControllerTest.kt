package io.tuzzy.portal.web

import io.tuzzy.portal.ResourceHelp.Companion.read
import io.tuzzy.portal.api.ApiEntry
import io.tuzzy.portal.api.ListResponse
import io.tuzzy.portal.domain.DApiEntry
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test

class ApiEntryControllerTest : WebTest() {
    @Test
    fun get() {
        val dApiEntry = DApiEntry("Test API", "API")
        dApiEntry.save()

        val apiName = "test-api"
        val apiEntry = getApi(apiName);

        assertThat(apiEntry.name).contains(apiName)
    }

    @Test
    fun createAndUpdate() {
        val bodyA = read("/request/api-1a.json")
        val bodyB = read("/request/api-2a.json")

        postApi(bodyA)
        postApi(bodyB)

        var apiEntries: ListResponse<ApiEntry> = getApiList()

        assertThat(apiEntries.content).hasSize(2)
        assertThat(apiEntries.content.map { it.name }).contains("identity-api")

        val bodyA2 = read("/request/api-1b.json")
        putApi("identity-api", bodyA2)

        // Refresh apis
        apiEntries = getApiList()

        // Assert size is still 2 and api name has been updated
        assertThat(apiEntries.content).hasSize(2)
        assertThat(apiEntries.content.map { it.name }).contains("user-api")
    }

    @Test
    fun delete() {
        val bodyA = read("/request/api-1a.json")
        postApi(bodyA)

        assertThat(getApiList().content).hasSize(1)

        delApi("identity-api")

        assertThat(getApiList().content).hasSize(0)
    }
}