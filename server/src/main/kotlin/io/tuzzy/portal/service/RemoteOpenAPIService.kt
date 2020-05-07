package io.tuzzy.portal.service

import io.swagger.v3.oas.models.OpenAPI
import io.swagger.v3.parser.OpenAPIV3Parser
import org.slf4j.LoggerFactory
import java.net.UnknownHostException
import javax.inject.Singleton

@Singleton
class RemoteOpenAPIService {
    private val logger = LoggerFactory.getLogger(javaClass)

    /**
     * Does a remote call to fetch and validate API spec
     */
    fun get(specUrl: String): OpenAPI {
        try {
            return OpenAPIV3Parser().read(specUrl)
        } catch (e: Exception) {
            logger.error(e.message)

            throw UnknownHostException()
        }
    }

    /**
     * Fetches spec and maps it to a map for DAO spec persistence
     */
    fun getJson(specUrl: String): Map<String, Any> {
        val openAPI = get(specUrl)

        return SpecMapper.toJson(openAPI)
    }
}