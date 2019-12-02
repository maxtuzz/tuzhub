package io.tuzzy.portal.domain

import io.ebean.Model
import io.ebean.annotation.WhenCreated
import io.ebean.annotation.WhenModified
import java.time.Instant
import java.util.*
import javax.persistence.Id
import javax.persistence.MappedSuperclass
import javax.persistence.Version

@MappedSuperclass
open class BaseDomain : Model() {
    @Id
    var id: UUID = UUID.randomUUID()

    @Version
    var version: Long = 0

    @WhenCreated
    lateinit var whenCreated: Instant

    @WhenModified
    lateinit var whenModified: Instant
}