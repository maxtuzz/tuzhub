package io.tuzzy.portal.domain

import io.ebean.annotation.DbJsonB
import io.tuzzy.portal.domain.finder.DApiSpecFinder
import javax.persistence.Entity
import javax.persistence.ManyToOne
import javax.persistence.Table

@Entity
@Table(name = "api_spec")
class DApiSpec(
    apiEntry: DApiEntry,
    specVersion: String? = "default",
    openApi: Map<String, Any>?,
    manuallyConfigured: Boolean = false
) : BaseDomain() {
    /**
     * OpenAPI field is the physical open api doc stored as a json document
     */
    @DbJsonB
    var openApi = openApi
    var specVersion = specVersion

    @ManyToOne
    var apiEntry: DApiEntry = apiEntry

    /**
     * Manually configured api specs will not be polled for updates
     */
    var manuallyConfigured: Boolean = manuallyConfigured;

    companion object Find : DApiSpecFinder()
}
