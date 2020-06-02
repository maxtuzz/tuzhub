package io.tuzzy.portal.config

import io.dinject.Bean
import io.dinject.Factory
import io.ebean.DB
import io.ebean.Database

@Factory
class SetupConfig {
    /**
     * Eagerly initiate default database
     *
     * note: ebean will do this on first query, but we want to ensure it happens on app startup
     */
    @Bean
    fun database(): Database {
        return DB.getDefault()
    }

    // Add ebean insight client here
}