package io.tuzzy.portal.domain

import io.tuzzy.portal.domain.query.QDApiSpec
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test

internal class DApiSpecTest {
    @Test
    fun insertFindDelete() {
        val apiEntry = DApiEntry("The Force API", "This api entry is for testing purposes")
        apiEntry.save()

        val spec = DApiSpec(
            apiEntry = apiEntry,
            specUrl = "http://order.66.com",
            status = SpecStatus.ACTIVE
        )
        spec.save()

        var foundSpec = find()

        assertThat(foundSpec).isEqualTo(spec)

        spec.delete()

        foundSpec = find()
        assertThat(foundSpec).isNull()
    }

    private fun find(): DApiSpec? {
        return QDApiSpec().apiEntry
            .name.eq("the-force-api")
            .findOne()
    }
}