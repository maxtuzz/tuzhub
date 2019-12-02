package io.tuzzy.portal.domain.finder

import io.ebean.Finder
import io.tuzzy.portal.domain.DApiSpec

open class DApiSpecFinder : Finder<Long, DApiSpec>(DApiSpec::class.java)

