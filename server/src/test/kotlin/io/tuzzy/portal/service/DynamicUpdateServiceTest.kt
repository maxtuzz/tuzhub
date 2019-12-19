package io.tuzzy.portal.service

import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import java.util.*

class DynamicUpdateServiceTest {
    private lateinit var dynamicUpdateService: DynamicUpdateService

    @BeforeEach
    fun setup() {
        // Wire up dependencies
        dynamicUpdateService = DynamicUpdateService(
            ApiSpecService(
                RemoteOpenAPIService() // <-- could be mocked honestly - probably don't need to test these integrations
            )
        )
    }

    @Test
    fun `Turn on dynamic spec update`() {
        dynamicUpdateService.startDynamicConfig(1000)

        var nextRefresh = dynamicUpdateService.getScheduledTime()
        val currentDate = Date(System.currentTimeMillis())

        assertThat(nextRefresh).isAfter(currentDate)

        dynamicUpdateService.stopDynamicUpdate()
        nextRefresh = dynamicUpdateService.getScheduledTime()
    }
}