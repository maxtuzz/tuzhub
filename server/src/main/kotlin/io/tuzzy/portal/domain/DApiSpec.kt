package io.tuzzy.portal.domain

import io.ebean.annotation.DbJson
import io.tuzzy.portal.domain.finder.DApiSpecFinder
import javax.persistence.Entity
import javax.persistence.ManyToOne
import javax.persistence.Table

@Entity
@Table(name = "api_spec")
class DApiSpec(
    apiEntry: DApiEntry,
    specVersion: String = "v1",
    status: SpecStatus = SpecStatus.ACTIVE,
    specUrl: String? = null,
    spec: Map<String, Any>? = null
) : BaseDomain() {
    @ManyToOne
    var apiEntry: DApiEntry = apiEntry

    var specVersion = specVersion
    var status = status
    var specUrl = specUrl

    /**
     * OpenAPI field is the physical open api doc stored as a json document
     */
    @DbJson
    var spec: Map<String, Any>? = spec

    companion object Find : DApiSpecFinder()
}
