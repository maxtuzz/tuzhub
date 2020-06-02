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

        fun remoteEnabled(): Boolean {
            return Config.getBool("tuzhub.enableRemoteUpdates", true)
        }
    }
}