package io.tuzzy.portal.service

import com.fasterxml.jackson.databind.ObjectMapper
import io.javalin.http.BadRequestResponse
import io.javalin.http.ForbiddenResponse
import io.javalin.http.NotFoundResponse
import io.swagger.v3.parser.OpenAPIV3Parser
import io.tuzzy.portal.api.ApiSpec
import io.tuzzy.portal.domain.DApiEntry
import io.tuzzy.portal.domain.DApiSpec
import io.tuzzy.portal.domain.SpecStatus
import io.tuzzy.portal.domain.query.QDApiEntry
import io.tuzzy.portal.domain.query.QDApiSpec
import org.slf4j.LoggerFactory
import javax.inject.Singleton


@Singleton
class ApiSpecService(private val remoteOpenAPIService: RemoteOpenAPIService) {
    private val logger = LoggerFactory.getLogger(javaClass)

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
     * Deletes a spec based on its version tag
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

        if (updateReq.spec != null) {
            val validateContent = OpenAPIV3Parser().readContents(SpecMapper.toString(updateReq.spec!!))

            dSpec.spec = SpecMapper.toJson(validateContent.openAPI)
            dSpec.save()

            return
        }

        refreshDSpec(dSpec)
    }

    /**
     * Will update and set new active spec record
     */
    fun createSpecVersion(apiName: String, spec: ApiSpec) {
        val api = QDApiEntry()
            .name.eq(apiName)
            .findOne() ?: throw NotFoundResponse("An API with that name cannot be found")

        if (spec.spec != null && api.dynamicConf) {
            throw BadRequestResponse("API is set to be dynamically configured, please supply a remote spec url or turn off dynamic configuration")
        }

        // If created spec is set to active, then de
        if (spec.status == SpecStatus.ACTIVE) {
            markSpecHistoric(api)
        }

        val jsonSpec: Map<String, Any> = getSpecJson(spec)

        // Save new entry
        saveSpec(
            apiEntry = api,
            specUrl = spec.specUrl,
            status = spec.status,
            version = spec.specVersion,
            json = jsonSpec
        )
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
            .apiEntry.dynamicConf.eq(true)
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
        if (!apiSpec.apiEntry.dynamicConf || apiSpec.specUrl == null) {
            throw ForbiddenResponse(
                "API ${apiSpec.apiEntry.name}, is set to manual spec control. Edit API" +
                        " entry to use dynamic configuration and include an open api specification url to use this feature"
            )
        }

        val jsonSpec = remoteOpenAPIService.getJson(apiSpec.specUrl!!)

        if (compareSpecs(apiSpec.spec, jsonSpec)) return

        logger.info("New version detected for ${apiSpec.apiEntry.name}/${apiSpec.specVersion}")

        apiSpec.spec = jsonSpec
        apiSpec.save()
    }

    /**
     * Checks to see if new spec is different from stored spec
     */
    private fun compareSpecs(
        spec1: Map<String, Any>?,
        spec2: Map<String, Any>
    ): Boolean {
        val mapper = ObjectMapper()
        val currentSpec = mapper.writeValueAsString(spec1)
        val newSpec = mapper.writeValueAsString(spec2)

        if (currentSpec == newSpec) {
            return true
        }

        return false
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

    /**
     * Save spec
     */
    fun saveSpec(
        apiEntry: DApiEntry,
        status: SpecStatus,
        version: String,
        json: Map<String, Any>,
        specUrl: String? = null
    ) {
        DApiSpec(
            apiEntry = apiEntry,
            status = status,
            specVersion = version,
            spec = json,
            specUrl = specUrl
        ).save()
    }

    /**
     * Returns json from either full spec or from remote spec url
     */
    private fun getSpecJson(spec: ApiSpec): Map<String, Any> {
        return when {
            spec.specUrl != null -> {
                remoteOpenAPIService.getJson(spec.specUrl)
            }
            spec.spec != null -> {
                val validateContent = OpenAPIV3Parser().readContents(SpecMapper.toString(spec.spec!!))
                SpecMapper.toJson(validateContent.openAPI)
            }
            else -> {
                null
            }
        } ?: throw BadRequestResponse("No specUrl or full spec supplied in request body")
    }
}
