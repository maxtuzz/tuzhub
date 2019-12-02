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
    content: Map<String, Any>?,
    manuallyConfigured: Boolean = false
) : BaseDomain() {
    @DbJsonB
    var content = content
    var specVersion = specVersion

    @ManyToOne
    var apiEntry: DApiEntry = apiEntry

    /**
     * Manually configured api specs will not be polled for updates
     */
    var manuallyConfigured: Boolean = manuallyConfigured;

    companion object Find : DApiSpecFinder()
}
