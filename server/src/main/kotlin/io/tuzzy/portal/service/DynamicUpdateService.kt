package io.tuzzy.portal.service

import io.tuzzy.portal.config.AppGlobal
import org.slf4j.LoggerFactory
import java.util.*
import javax.annotation.PreDestroy
import javax.inject.Singleton
import kotlin.concurrent.schedule

@Singleton
class DynamicUpdateService(private val specService: ApiSpecService) {
    private lateinit var dynamicUpdateJob: TimerTask
    private var pollingStatus = PollingStatus.STOPPED
    private val logger = LoggerFactory.getLogger(javaClass)

    enum class PollingStatus {
        RUNNING,
        STOPPED
    }

    init {
        if (AppGlobal.remoteEnabled()) {
            startPolling()
            logger.info("Dynamic remote updating is enabled");
        } else {
            logger.info("Dynamic remote updating is disabled");
        }
    }

    /**
     * Kick starts dynamic update polling
     */
    fun startPolling(refreshInterval: Long = 60000) {
        pollingStatus = PollingStatus.RUNNING

        logger.info("Starting spec update service, polling interval set to $refreshInterval")

        val refresh: TimerTask.() -> Unit = refreshAllSpecs()

        dynamicUpdateJob = Timer("dynamic-config", false)
            .schedule(2000, refreshInterval, refresh)
    }

    private fun refreshAllSpecs(): TimerTask.() -> Unit {
        return {
            // Get all pollable spec entries
            val specs = specService.getPollableSpecs()

            if (specs.isNotEmpty()) {
                logger.info("Polling for API specification changes ...")

                specs.forEach {
                    logger.info("${it.apiEntry.name}/${it.specVersion} [${it.status}]")

                    specService.refreshDSpec(it)
                }
            }
        }
    }

    /**
     * Returns the service polling status
     */
    fun getStatus(): PollingStatus {
        return pollingStatus
    }

    /**
     * Returns next update time
     */
    fun getNextUpdateTime(): Date {
        dynamicUpdateJob.cancel()
        val time = dynamicUpdateJob.scheduledExecutionTime()
        return Date(time)
    }

    @PreDestroy
    fun stopDynamicUpdate() {
        if (AppGlobal.remoteEnabled()) {
            logger.info("Stopping [dynamic-config] thread ...")
            pollingStatus = PollingStatus.STOPPED
            dynamicUpdateJob.cancel()
        }
    }
}