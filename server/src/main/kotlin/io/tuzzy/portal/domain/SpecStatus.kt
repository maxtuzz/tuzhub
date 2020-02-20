package io.tuzzy.portal.domain

enum class SpecStatus {
    /**
     * Active specs will be polled for spec data if api dynamic config is set to true
     */
    ACTIVE,

    /**
     * Pre release specs will be polled for spec data if api dynamic config is set to true
     */
    PRE_RELEASE,

    /**
     * Hidden specs will not be polled
     */
    HIDDEN,

    /**
     * Admin specs will be polled if api dynamic config is set to true
     */
    ADMIN_ONLY,

    /**
     * Historic specs are persisted but aren't maintained through dynamic config
     */
    HISTORIC,

    /**
     * Deprecated specs are older specs that are still polled for updates but are marked as deprecated so that users
     * are aware it is ending it's end-of-life
     */
    DEPRECATED
}