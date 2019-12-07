package io.tuzzy.portal.domain

import io.ebean.annotation.Cache
import io.tuzzy.portal.domain.finder.DApiEntryFinder
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Table

@Cache(nearCache = true, naturalKey = ["name"])
@Entity
@Table(name = "api_entry")
class DApiEntry(displayName: String, description: String?) : BaseDomain() {
    @Column(unique = true, nullable = false, length = 45)
    var displayName: String = displayName
    @Column(unique = true, nullable = false, length = 45)
    var name: String = displayName.toLowerCase().replace(" ", "-")
    var description: String? = description

    companion object Find : DApiEntryFinder()
}