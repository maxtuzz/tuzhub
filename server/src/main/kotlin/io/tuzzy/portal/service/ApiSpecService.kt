package io.tuzzy.portal.service

import io.javalin.http.ForbiddenResponse
import io.javalin.http.NotFoundResponse
import io.tuzzy.portal.api.ApiSpec
import io.tuzzy.portal.domain.DApiEntry
import io.tuzzy.portal.domain.DApiSpec
import io.tuzzy.portal.domain.SpecStatus
import io.tuzzy.portal.domain.query.QDApiEntry
import io.tuzzy.portal.domain.query.QDApiSpec
import org.slf4j.LoggerFactory
import java.text.SimpleDateFormat
import java.util.*
import javax.annotation.PreDestroy
import javax.inject.Singleton
import kotlin.concurrent.schedule


@Singleton
class ApiSpecService(private val remoteOpenAPIService: RemoteOpenAPIService) {
    /**
     * Returns the active api spec for an api entry
     */
    fun getActiveSpec(apiName: String): DApiSpec {
        return QDApiSpec().apiEntry
            .name.eq(apiName)
            .status.eq(SpecStatus.ACTIVE)
            .findOne() ?: throw NotFoundResponse("No active spec found for this API. Please set an active spec.")
    }

    /**
     * Deletes a spec based on it's version tag
     */
    fun deleteSpec(apiName: String, version: String) {
        val rows = QDApiSpec()
            .apiEntry.name.eq(apiName)
            .specVersion.eq(version)
            .delete()

        if (rows < 1) throw NotFoundResponse("Delete failed, no specification found")
    }

    /**
     * Updates a spec based on it's api entry and a request body
     */
    fun updateSpec(apiName: String, specVersion: String, updateReq: ApiSpec) {
        val dSpec = getDSpecByVersion(apiName, specVersion)
        dSpec.specVersion = updateReq.specVersion
        dSpec.specUrl = updateReq.specUrl
        dSpec.status = updateReq.status

        refreshDSpec(dSpec)
    }

    /**
     * Will update and set new active spec record
     */
    fun createSpecVersion(apiName: String, spec: ApiSpec) {
        val api = QDApiEntry()
            .name.eq(apiName)
            .findOne() ?: throw NotFoundResponse("An API with that name cannot be found")

        // If created spec is set to active, then de
        if (spec.status == SpecStatus.ACTIVE) {
            markSpecHistoric(api)
        }

        if (spec.specUrl == null) {
            throw ForbiddenResponse("New specs only supported with remote call for now")
        }

        val jsonSpec = remoteOpenAPIService.getJson(spec.specUrl)

        // Save new entry
        DApiSpec(api, spec.specVersion, spec.status, spec.specUrl, jsonSpec).save()
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

    /**
     * Will get spec by supplied version or if specVersion is set to active will fetch by active spec status
     */
    fun getSpecByVersion(apiName: String, specVersion: String): ApiSpec {
        val dApiSpec: DApiSpec = getDSpecByVersion(apiName, specVersion)

        return ApiSpec(
            apiName = dApiSpec.apiEntry.name,
            specVersion = dApiSpec.specVersion,
            specUrl = dApiSpec.specUrl,
            status = dApiSpec.status,
            spec = dApiSpec.spec
        )
    }

    /**
     * Returns a list of api specs for supplied api
     */
    fun getAll(apiName: String): MutableList<DApiSpec> {
        return QDApiSpec()
            .apiEntry.name.eq(apiName)
            .findList()
    }

    /**
     * Refreshes an API spec based on its apiname and spec version
     */
    fun refreshSpec(apiName: String, specVersion: String) {
        val apiSpec = getDSpecByVersion(apiName, specVersion)

        refreshDSpec(apiSpec)
    }

    /**
     * Returns a list of pollable specs
     */
    fun getPollableSpecs(): List<DApiSpec> {
        return QDApiSpec()
            .apiEntry.manuallyConfigured.eq(false)
            .or()
                .status.eq(SpecStatus.ACTIVE)
                .status.eq(SpecStatus.PRE_RELEASE)
                .status.eq(SpecStatus.ADMIN_ONLY)
            .endOr()
            .findList()
    }

    /**
     * Refreshes the open api entry for supplied dao spec bean
     */
    fun refreshDSpec(apiSpec: DApiSpec) {
        if (apiSpec.apiEntry.manuallyConfigured || apiSpec.specUrl == null) {
            throw ForbiddenResponse(
                "API ${apiSpec.apiEntry.name}, is set to manual spec control. Edit API" +
                        " entry to use dynamic configuration and include an open api specification url to use this feature"
            )
        }

        val jsonSpec = remoteOpenAPIService.getJson(apiSpec.specUrl!!)

        apiSpec.spec = jsonSpec
        apiSpec.save()
    }

    /**
     * Get DAO by version
     */
    private fun getDSpecByVersion(apiName: String, specVersion: String): DApiSpec {
        return if (specVersion.toLowerCase() == "active") {
            getActiveSpec(apiName)
        } else {
            QDApiSpec()
                .apiEntry.name.eq(apiName)
                .specVersion.eq(specVersion)
                .findOne() ?: throw NotFoundResponse("No specification can be found for $apiName/$specVersion")
        }
    }

    /**
     * Marks current active spec for an api as historic
     */
    private fun markSpecHistoric(api: DApiEntry) {
        QDApiSpec()
            .apiEntry.name.eq(api.name)
            .status.eq(SpecStatus.ACTIVE)
            .asUpdate()
            .set("status", SpecStatus.HISTORIC)
            .update()
    }
}
