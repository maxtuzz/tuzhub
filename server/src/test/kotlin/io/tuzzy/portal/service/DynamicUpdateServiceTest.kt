package io.tuzzy.portal.service

import io.tuzzy.portal.service.DynamicUpdateService.PollingStatus
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.function.Executable
import java.util.*

class DynamicUpdateServiceTest {
    private lateinit var dynamicUpdateService: DynamicUpdateService

    @BeforeEach
    fun setup() {
        // Wire up dependencies
        dynamicUpdateService = DynamicUpdateService(
            ApiSpecService(
                RemoteOpenAPIService()
            )
        )
    }

    @Test
    fun `Turn on + off dynamic spec update`() {
        dynamicUpdateService.startPolling(1000)

        val nextRefresh = dynamicUpdateService.getNextUpdateTime()
        val currentDate = Date(System.currentTimeMillis())

        Assertions.assertAll(
            Executable { assertThat(nextRefresh).isAfter(currentDate) },
            Executable { assertThat(dynamicUpdateService.getStatus()).isEqualTo(PollingStatus.RUNNING) }
        )

        dynamicUpdateService.stopDynamicUpdate()

        assertThat(dynamicUpdateService.getStatus()).isEqualTo(PollingStatus.STOPPED)
    }
}