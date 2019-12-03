package io.tuzzy.portal.api

open class GenericResource<T> {
    private var map: MutableMap<String, T> = HashMap()

    // Hal link property
    fun getProperty(name: String): T? {
        return map[name]
    }
}