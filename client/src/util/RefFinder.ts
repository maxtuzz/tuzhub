import { OpenAPIV3 } from 'openapi-types';
import SchemaUtils from './SchemaUtils';

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
    let schemaRefTitle: string = isArray ? 'Array<object>' : 'object';

    if (isArray) {
      schemaToProcess = SchemaUtils.getArraySchema(suppliedSchema);
      if (!schemaToProcess) {
        return schemaRefTitle;
      }
      if (schemaToProcess.type !== 'object') {
        return `Array<${schemaToProcess.type}>`;
      }
    }

    // Default schema ref title
    const notArrayOrObject = !isArray && type !== 'object';
    if (notArrayOrObject || !schemaToProcess) {
      throw TypeError('Nothing defined to process');
    }

    const properties = SchemaUtils.getSchemaProps(schemaToProcess);
    if (!properties) {
      return schemaRefTitle;
    }

    // Get all field names from the supplied schema
    const fieldNames: string[] = properties.map(([key]) => key);

    const possibleSchemas = components?.schemas && Object.entries(components?.schemas);
    if (!possibleSchemas) {
      throw TypeError('No schema reference found');
    }

    for (const [schemaName, resource] of possibleSchemas) {
      const refProps = SchemaUtils.getSchemaProps(resource);

      // No properties, then continue to next iteration
      if (!refProps) {
        continue;
      }

      // All properties match then set schema ref title
      const found: boolean[] = refProps.map(([key]) => fieldNames.includes(key));
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
