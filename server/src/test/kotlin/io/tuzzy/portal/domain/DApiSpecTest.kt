package io.tuzzy.portal.domain

import io.tuzzy.portal.domain.query.QDApiSpec
import org.junit.jupiter.api.Test
import kotlin.test.assertEquals
import kotlin.test.assertNull

internal class DApiSpecTest {
    @Test
    fun insertFindDelete() {
        val apiEntry = DApiEntry("The Force API", "This api entry is for testing purposes")
        apiEntry.save()

        val spec = DApiSpec(
            apiEntry = apiEntry,
            status = SpecStatus.ACTIVE,
            specUrl = "http://order.66.com"
        )
        spec.save()

        var foundSpec = find()
        assertEquals(foundSpec, spec)

        spec.delete()

        foundSpec = find()
        assertNull(foundSpec)
    }

    private fun find(): DApiSpec? {
        return QDApiSpec().apiEntry
            .name.eq("the-force-api")
            .findOne()
    }
}