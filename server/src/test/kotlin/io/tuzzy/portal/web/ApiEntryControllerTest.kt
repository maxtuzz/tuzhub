package io.tuzzy.portal.web

import com.fasterxml.jackson.databind.ObjectMapper
import io.tuzzy.portal.ResourceHelp.Companion.read
import io.tuzzy.portal.ResourceHelp.Companion.readYamlToJsonMap
import io.tuzzy.portal.api.ApiEntry
import io.tuzzy.portal.api.ListResponse
import io.tuzzy.portal.domain.DApiEntry
import io.tuzzy.portal.domain.query.QDApiSpec
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Assertions.assertAll
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.function.Executable

class ApiEntryControllerTest : WebTest() {
    @Test
    fun `GET ApiEntry`() {
        val dApiEntry = DApiEntry("Test API", "API")
        dApiEntry.save()

        val apiName = "test-api"
        val apiEntry = getApi(apiName);

        assertThat(apiEntry.name).contains(apiName)
    }

    @Test
    fun `POST and PUT ApiEntry`() {
        val bodyA = read("/request/api-1a.json")
        val bodyB = read("/request/api-2a.json")

        postApi(bodyA)
        postApi(bodyB)

        var apiEntries: ListResponse<ApiEntry> = getApiList()

        assertAll(
            Executable { assertThat(apiEntries.content).hasSize(2) },
            Executable { assertThat(apiEntries.content.map { it.name }).contains("identity-api") }
        )

        val bodyA2 = read("/request/api-1b.json")
        putApi("identity-api", bodyA2)

        // Refresh apis
        apiEntries = getApiList()

        // Assert size is still 2 and api name has been updated
        assertAll(
            Executable { assertThat(apiEntries.content).hasSize(2) },
            Executable { assertThat(apiEntries.content.map { it.name }).contains("user-api") }
        )
    }

    @Test
    fun `POST with manually configured spec`() {
        val fullSpec = readYamlToJsonMap("/specs/uspto.yaml")

        val entry = ApiEntry(
            displayName = "api name",
            description = "Yes, this is manually maintained",
            dynamicConf = false
        )

        entry.fullSpec = fullSpec

        val bodyA = ObjectMapper().writeValueAsString(entry)

        postApi(bodyA)

        val findOne = QDApiSpec().apiEntry.name.eq("api-name").findOne()

        assertAll(
            Executable { assertThat(findOne).isNotNull },
            Executable { assertThat(findOne?.spec?.getValue("info")).isNotNull }
        )
    }

    @Test
    fun `DELETE ApiEntry`() {
        val bodyA = read("/request/api-1a.json")
        postApi(bodyA)

        assertThat(getApiList().content).hasSize(1)

        delApi("identity-api")

        assertThat(getApiList().content).hasSize(0)
    }
}