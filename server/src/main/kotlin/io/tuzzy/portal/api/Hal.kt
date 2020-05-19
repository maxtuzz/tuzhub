package io.tuzzy.portal.api

import io.javalin.http.Context

interface Hal<T> {
    fun withHal(ctx: Context): T
}