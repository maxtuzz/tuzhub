package io.tuzzy.portal.domain

import io.ebean.annotation.Cache
import javax.persistence.Entity
import javax.persistence.Table

/**
 * A space can be either a personal space or an organisation space
 */
@Cache(nearCache = true, naturalKey = ["name"])
@Entity
@Table(name = "space")
class DSpace(name: String, type: SpaceType) : BaseDomain() {
}