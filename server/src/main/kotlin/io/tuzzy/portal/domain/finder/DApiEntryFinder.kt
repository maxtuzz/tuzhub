package io.tuzzy.portal.domain.finder

import io.ebean.Finder
import io.tuzzy.portal.domain.DApiEntry

open class DApiEntryFinder : Finder<Long, DApiEntry>(DApiEntry::class.java)

