package main

import io.ebean.annotation.Platform
import io.ebean.dbmigration.DbMigration

/**
 * Run this to generate migration sql based on changes to domain models
 */
fun main() {
  val dbMigration = DbMigration.create()
  dbMigration.setPlatform(Platform.POSTGRES)
  dbMigration.setPathToResources("server/src/main/resources")

  dbMigration.generateMigration()
}
