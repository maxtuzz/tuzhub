import {OpenAPIV3} from "openapi-types";
import ApiEntry from "../model/ApiEntry";

/**
 * Type guards for validation entries
 */
class ApiEntryUtils {
    static isApiEntry(entry: any): entry is ApiEntry {
        return !!(entry as OpenAPIV3.SchemaObject).type;
    }
}

export default ApiEntryUtils;