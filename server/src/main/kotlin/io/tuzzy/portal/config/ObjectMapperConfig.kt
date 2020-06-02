package io.tuzzy.portal.config

import com.fasterxml.jackson.annotation.JsonInclude
import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.SerializationFeature
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule
import io.javalin.plugin.json.JavalinJackson

class ObjectMapperConfig {
    companion object {
        fun get(): ObjectMapper {
            return JavalinJackson.getObjectMapper()
                .setDefaultPropertyInclusion(JsonInclude.Include.NON_NULL)
                .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
                .enable(SerializationFeature.INDENT_OUTPUT)
                .registerModule(JavaTimeModule());
        }
    }
}