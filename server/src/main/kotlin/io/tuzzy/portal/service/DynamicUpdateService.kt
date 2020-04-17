package io.tuzzy.portal.service

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
        startPolling()
    }

    /**
     * Kick starts dynamic update polling
     */
    fun startPolling(refreshInterval: Long = 60000) {
        pollingStatus = PollingStatus.RUNNING

        logger.info("Starting spec update service, polling interval set to $refreshInterval")

        val refresh: TimerTask.() -> Unit = {
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

        dynamicUpdateJob = Timer("dynamic-config", false)
            .schedule(2000, refreshInterval, refresh)
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
        logger.info("Stopping [dynamic-config] thread ...")
        pollingStatus = PollingStatus.STOPPED
        dynamicUpdateJob.cancel()
    }
}