import {OpenAPIV3} from "openapi-types";

class RefFinder {
    static find(suppliedSchema: OpenAPIV3.SchemaObject, components: OpenAPIV3.ComponentsObject): string {
        if (suppliedSchema.type !== "object" || !suppliedSchema) {
            throw TypeError("Please supply schema of type object");
        }

        const properties = suppliedSchema.properties

        if (!properties) {
            return "";
        }

        // Get all field names from suppliedSchema
        const fieldNames: string[] = Object.entries(properties).map(([key]) => key);

        const schemaReference = components?.schemas && Object.entries(components?.schemas);

        if (!schemaReference) {
            throw TypeError("No schema reference found")
        }

        let schemaRefTitle: string = "object";

        for (const [schemaName, resource] of schemaReference) {
            const componentResource = resource as OpenAPIV3.SchemaObject;

            const refProps = componentResource.properties;

            // No properties, then continue to next iteration
            if (!refProps) {
                continue;
            }

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