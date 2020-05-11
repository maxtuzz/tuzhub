import {OpenAPIV3} from "openapi-types";

class RefFinder {
    /**
     * Fetches the name of the schema that a suppliedSchema belongs to based on its property contents
     * @param suppliedSchema
     * @param components
     */
    static find(suppliedSchema: OpenAPIV3.SchemaObject, components: OpenAPIV3.ComponentsObject): string {
        if (suppliedSchema.type !== "object" || !suppliedSchema) {
            throw TypeError("Please supply schema of type object");
        }

        // Default schema ref title
        let schemaRefTitle: string = "object";

        const properties = suppliedSchema.properties
        if (!properties) {
            return schemaRefTitle;
        }

        // Get all field names from the supplied schema
        const fieldNames: string[] = Object.entries(properties).map(([key]) => key);

        const possibleSchemas = components?.schemas && Object.entries(components?.schemas);
        if (!possibleSchemas) {
            throw TypeError("No schema reference found")
        }

        for (const [schemaName, resource] of possibleSchemas) {
            const componentResource = resource as OpenAPIV3.SchemaObject;
            const refProps = componentResource.properties;

            // No properties, then continue to next iteration
            if (!refProps) {
                continue;
            }

            // All properties match then set schema ref title
            const found: boolean[] = Object.entries(refProps).map(([key]) => fieldNames.includes(key));
            if (found.every(Boolean)) {
                schemaRefTitle = schemaName;

                break;
            }
        }

        return schemaRefTitle;
    }
}

export default RefFinder;