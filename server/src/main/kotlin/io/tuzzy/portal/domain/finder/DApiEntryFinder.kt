package io.tuzzy.portal.domain.finder

import io.ebean.Finder
import io.tuzzy.portal.domain.DApiEntry
import java.util.UUID

open class DApiEntryFinder : Finder<UUID, DApiEntry>(DApiEntry::class.java)

