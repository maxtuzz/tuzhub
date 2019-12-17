package io.tuzzy.portal.service

import io.swagger.v3.oas.models.OpenAPI
import io.swagger.v3.parser.OpenAPIV3Parser
import java.net.UnknownHostException
import javax.inject.Singleton

@Singleton
class RemoteOpenAPIService {
    /**
     * Returns OpenAPI spec and fails if remote host cannot be connected to
     */
    fun get(specUrl: String): OpenAPI {
        try {
            return OpenAPIV3Parser().read(specUrl)
        } catch (e: Exception) {
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