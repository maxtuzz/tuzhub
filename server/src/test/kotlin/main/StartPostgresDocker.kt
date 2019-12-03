package main

import io.ebean.docker.commands.PostgresConfig
import io.ebean.docker.commands.PostgresContainer

/**
 * This will create postgres instance in docker used for local development
 */
fun main(args: Array<String>) {
    val config = PostgresConfig("11")
    config.setContainerName("pg11")
    config.setUser("tuzzy_portal")
    config.password = "test"
    config.dbName = "tuzzy_portal"
    config.port = "7432"

    val container = PostgresContainer(config)
    container.start()

    // Print output
    println("url: ${container.jdbcUrl()}")
    println("user: ${config.username}")
    println("password: ${config.password}")
}