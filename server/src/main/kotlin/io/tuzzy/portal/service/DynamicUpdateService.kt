package io.tuzzy.portal.service

import org.slf4j.LoggerFactory
import java.util.*
import javax.annotation.PreDestroy
import javax.inject.Singleton
import kotlin.concurrent.schedule

@Singleton
class DynamicUpdateService(private val specService: ApiSpecService) {
    private lateinit var dynamicUpdateJob: TimerTask
    private val logger = LoggerFactory.getLogger(javaClass)

    init {
        startDynamicConfig()
    }

    /**
     * Kick starts dynamic update polling
     */
    fun startDynamicConfig(refreshInterval: Long = 60000) {
        logger.info("Starting spec update service, polling interval set to $refreshInterval")

        val refresh: TimerTask.() -> Unit = {
            logger.info("Polling for API specification changes ...")

            // Get all pollable spec entries
            val specs = specService.getPollableSpecs()

            logger.info("Fetching the following specs:")

            specs.forEach {
                logger.info("${it.apiEntry.name}/${it.specVersion} [${it.status}]")

                specService.refreshDSpec(it)
            }
        }

        dynamicUpdateJob = Timer("dynamic-config", false)
            .schedule(2000, refreshInterval, refresh)
    }

    /**
     * Returns next update time
     */
    fun getScheduledTime(): Date {
        dynamicUpdateJob.cancel()
        val time = dynamicUpdateJob.scheduledExecutionTime()
        return Date(time)
    }

    @PreDestroy
    fun stopDynamicUpdate() {
        logger.info("Stopping [dynamic-config] thread ...")
        dynamicUpdateJob.cancel()
    }
}