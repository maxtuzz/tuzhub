package io.tuzzy.portal

import java.io.File

class ResourceHelp {
    companion object {
        fun read(path: String): String {
            return File("src/test/resources$path")
                .inputStream()
                .readBytes()
                .toString(Charsets.UTF_8)
        }
    }
}