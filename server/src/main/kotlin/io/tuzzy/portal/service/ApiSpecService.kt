package io.tuzzy.portal.service

import io.tuzzy.portal.api.ApiSpec
import io.tuzzy.portal.domain.DApiSpec
import io.tuzzy.portal.domain.SpecStatus
import io.tuzzy.portal.domain.query.QDApiSpec
import javax.inject.Singleton

@Singleton
class ApiSpecService {
    /**
     * Returns the active api spec for an api entry
     */
    fun getActiveSpec(apiName: String): DApiSpec? {
        return QDApiSpec().apiEntry
            .name.eq(apiName)
            .status.eq(SpecStatus.ACTIVE)
            .findOne()
    }

    /**
     * Deletes a spec based on it's version tag
     */
    fun deleteSpec(apiName: String, version: String) {
        val rows = QDApiSpec()
            .apiEntry.name.eq(apiName)
            .specVersion.eq(version)
            .delete()

        if (rows < 1) throw RuntimeException("Delete failed, no specification found")
    }

    /**
     * Updates a spec based on it's api entry and a request body
     */
    fun updateSpec(apiName: String, updateReq: ApiSpec) {
        val rows = QDApiSpec()
            .apiEntry.name.eq(apiName)
            .asUpdate()
            .set("spec_version", updateReq.specVersion)
            .set("spec_url", updateReq.specUrl)
            .set("status", updateReq.status)
            .update()

        if (rows < 1) throw RuntimeException("Update failed, no specification found")
    }

    /**
     * Will update and set new active spec record
     */
    fun createSpecVersion(apiName: String, spec: ApiSpec) {
        // Update active spec and set to historic
        if (spec.status == SpecStatus.ACTIVE) {
            QDApiSpec()
                .apiEntry.name.eq(apiName)
                .status.eq(SpecStatus.ACTIVE)
                .asUpdate()
                .set("status", SpecStatus.HISTORIC)
                .update()
        }

        val historicSpec = QDApiSpec()
            .apiEntry.name.eq(apiName)
            .findOne() ?: throw RuntimeException("Oh no")

        // Save new entry
        DApiSpec(historicSpec.apiEntry, spec.specVersion, spec.status, spec.specUrl).save()
    }

    /**
     * Returns a list of specs for api
     */
    fun getApiSpecs(apiName: String): List<ApiSpec> {
        return QDApiSpec()
            .apiEntry
            .name.eq(apiName)
            .findList()
            .map { ApiSpec(it.apiEntry.name, it.specVersion, it.status, it.specUrl) }
    }
}