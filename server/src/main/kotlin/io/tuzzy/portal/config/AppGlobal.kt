package io.tuzzy.portal.config

import io.avaje.config.Config

class AppGlobal {
    companion object {
        fun port(): Int {
            return Config.getInt("app.port", 8090)
        }

        fun appName(): String {
            return Config.get("app.name", "tuzzy-api")
        }

        /**
         * Returns the google k8 service name
         */
        fun kServiceName(): String? {
            return Config.get("app.k_service")
        }

        /**
         * Google k8 cloud run
         */
        fun isKService(): Boolean {
            return kServiceName() != null
        }

        /**
         * Google k8 app version
         */
        fun kRevision(): String? {
            return Config.get("app.k_revision")
        }

        /**
         * Determines if remote/dynamic updating is running
         */
        fun remoteEnabled(): Boolean {
            return Config.getBool("tuzhub.enableRemoteUpdates", true)
        }
    }
}