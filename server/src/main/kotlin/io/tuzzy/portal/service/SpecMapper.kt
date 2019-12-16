package io.tuzzy.portal.service

import com.fasterxml.jackson.core.type.TypeReference
import com.fasterxml.jackson.databind.ObjectMapper
import io.swagger.v3.oas.models.OpenAPI

/**
 * Helper class for converting between json and an openapi dto bean
 */
class SpecMapper(private val mapper: ObjectMapper = ObjectMapper()) {
    fun toJson(apiSpec: OpenAPI): Map<String, Any> {
        return mapper.convertValue(apiSpec, object : TypeReference<Map<String, Any>>() {})
    }

    fun toOpenAPI(json: Map<String, Any>): OpenAPI {
        return mapper.convertValue(json, object : TypeReference<OpenAPI>() {})
    }
}