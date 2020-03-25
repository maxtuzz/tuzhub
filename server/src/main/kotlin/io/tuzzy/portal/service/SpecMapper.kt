package io.tuzzy.portal.service

import com.fasterxml.jackson.core.type.TypeReference
import com.fasterxml.jackson.databind.ObjectMapper
import io.swagger.v3.oas.models.OpenAPI

/**
 * Helper class for converting between json and an openapi dto bean
 */
class SpecMapper {
    companion object {
        private val mapper: ObjectMapper = ObjectMapper()

        fun toOpenAPI(json: Map<String, Any>): OpenAPI {
            return mapper.convertValue(json, object : TypeReference<OpenAPI>() {})
        }

        fun toJson(jsonString: String): Map<String, Any> {
            return mapper.readValue(jsonString, object : TypeReference<Map<String, Any>>() {})
        }

        fun toJson(apiSpec: OpenAPI): Map<String, Any> {
            return mapper.convertValue(apiSpec, object : TypeReference<Map<String, Any>>() {})
        }

        fun toString(json: Map<String, Any>): String {
            return mapper.writeValueAsString(json)
        }
    }
}