import {OpenAPIV3} from "openapi-types";
import SchemaUtils from "./SchemaUtils";

class RefFinder {
    /**
     * Fetches the name of the schema that a suppliedSchema belongs to based on its property contents
     * @param suppliedSchema
     * @param components
     */
    static find(suppliedSchema: OpenAPIV3.SchemaObject, components: OpenAPIV3.ComponentsObject): string {
        const type = suppliedSchema.type;
        let schemaToProcess: OpenAPIV3.SchemaObject | undefined = suppliedSchema;

        // Array - reset schema to process to inner array type
        const isArray: boolean = SchemaUtils.isArray(suppliedSchema);
        if (isArray) {
            schemaToProcess = SchemaUtils.getArraySchema(suppliedSchema);

            if (!schemaToProcess) {
                return "Array<object>";
            }

            if (schemaToProcess.type !== "object") {
                return `Array<${schemaToProcess.type}>`
            }
        }

        let schemaRefTitle: string = isArray ? "array" : "object";

        // Default schema ref title
        const notArrayOrObject = !isArray && type !== "object";
        if (notArrayOrObject || !schemaToProcess) {
            throw TypeError("Nothing defined to process")
        }

        const properties = schemaToProcess.properties
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

                // Add array notation to schema title if valid array
                if (isArray) {
                    schemaRefTitle = `Array<${schemaRefTitle}>`;
                }

                break;
            }
        }

        return schemaRefTitle;
    }
}

export default RefFinder;