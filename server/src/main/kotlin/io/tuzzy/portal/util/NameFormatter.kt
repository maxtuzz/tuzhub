package io.tuzzy.portal.util

/**
 * Correctly formats name from an incoming display name
 */
class NameFormatter {
    companion object {
        fun format(displayName: String): String {
            return displayName
                .toLowerCase()
                .trimStart()
                .trimEnd()
                .replace(" ", "-")
        }
    }
}