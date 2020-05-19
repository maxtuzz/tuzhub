package io.tuzzy.portal.api

import io.javalin.http.Context

class LinkResource(links: Links = Links(), embedded: MutableMap<String, Any>? = mutableMapOf()) :
    HalResource<LinkResource>(links, embedded) {

    override fun withHal(ctx: Context): LinkResource {
        links.addAll {
            HalBuilder(ctx)
                .toContextPath("self")
                .build()
        }

        return this;
    }
}