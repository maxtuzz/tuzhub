package io.tuzzy.portal.api

import io.javalin.http.Context

class ListResponse<T>(val content: List<T>) : HalResource<ListResponse<T>>() {
    override fun withHal(ctx: Context): ListResponse<T> {
        links.addAll {
            HalBuilder(ctx).toContextPath("self")
                .build()
        }

        return this
    }
}