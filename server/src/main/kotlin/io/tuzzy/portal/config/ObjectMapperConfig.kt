package io.tuzzy.portal.config

import com.fasterxml.jackson.annotation.JsonInclude
import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.SerializationFeature
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule

class ObjectMapperConfig {
    companion object {
        fun get(): ObjectMapper {
            return ObjectMapper().setDefaultPropertyInclusion(JsonInclude.Include.NON_EMPTY)
                .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
                .enable(SerializationFeature.INDENT_OUTPUT)
                .registerModule(JavaTimeModule());

        }
    }
}