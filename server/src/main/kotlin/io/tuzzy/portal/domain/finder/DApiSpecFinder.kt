package io.tuzzy.portal.domain.finder

import io.ebean.Finder
import io.tuzzy.portal.domain.DApiSpec
import java.util.UUID

open class DApiSpecFinder : Finder<UUID, DApiSpec>(DApiSpec::class.java)

