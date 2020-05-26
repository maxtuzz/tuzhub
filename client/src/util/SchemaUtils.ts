import {OpenAPIV3} from "openapi-types";

/**
 * Common functions for handling OpenAPI schema processing
 */
class SchemaUtils {
    /**
     * An array type can either have it's own properties, or be resolved by a ref
     * So properties will either be arraySchema.properties or arraySchema.items.properties
     *
     * This method will return the correct level of schema where .properties is accessible
     * @param arraySchema
     */
    static getArraySchema(arraySchema: OpenAPIV3.SchemaObject): OpenAPIV3.SchemaObject | undefined {
        if (!SchemaUtils.isArray(arraySchema)) {
            throw TypeError("Cannot get array schema of non array schema type");
        }

        if (arraySchema.items && SchemaUtils.isSchema(arraySchema.items)) {
            return arraySchema.items;
        }

        if (arraySchema.properties && SchemaUtils.isSchema(arraySchema)) {
            return arraySchema;
        }

        return undefined;
    }

    static getSchema(schema: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject | undefined) {
        if (!SchemaUtils.isSchema(schema)) {
            throw TypeError("The supplied parameter is not of type schema ")
        }

        return schema;
    }

    static getSchemaProps(schema: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject | undefined) {
        if (!schema) {
            return undefined;
        }

        if (!SchemaUtils.isSchema(schema)) {
            throw TypeError("The supplied parameter is not of type schema ")
        }

        const props = schema.properties;
        if (!props) {
            return undefined;
        }

        return Object.entries(props).filter(([, value]) => SchemaUtils.isSchema(value));
    }

    static isSchema(schema: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject | undefined): schema is OpenAPIV3.SchemaObject {
        return !!(schema as OpenAPIV3.SchemaObject);
    }

    static isArray(schema: OpenAPIV3.SchemaObject): schema is OpenAPIV3.ArraySchemaObject {
        return !!(schema as OpenAPIV3.ArraySchemaObject);
    }
}

export default SchemaUtils;