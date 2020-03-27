package io.tuzzy.portal

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.dataformat.yaml.YAMLFactory
import io.tuzzy.portal.service.SpecMapper
import java.io.File

/**
 * Helps with resource loading from files etc.
 */
class ResourceHelp {
    companion object {
        fun read(path: String): String {
            return File("src/test/resources$path")
                .inputStream()
                .readBytes()
                .toString(Charsets.UTF_8)
                .trim()
        }

        fun readYamlToJsonMap(path: String): Map<String, Any> {
            val yamlReader = ObjectMapper(YAMLFactory())
            val obj: Any = yamlReader.readValue(read(path), Any::class.java)

            val jsonString = ObjectMapper().writeValueAsString(obj)

            return SpecMapper.toJson(jsonString)
        }
    }
}