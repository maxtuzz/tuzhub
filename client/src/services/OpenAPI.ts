import SwaggerParser from "swagger-parser";

/**
 * OpenAPI wraps common swagger parser functionality to be used within saga yields
 */
export const OpenAPI = {
    // First point of call, can act as base url
    dereference(apiSpec: string): Promise<Response> {
        return SwaggerParser.dereference(apiSpec)
            .then(resp => resp)
            .catch(error => error);
    },
    validate(apiSpec: string): Promise<Response> {
        return SwaggerParser.validate(apiSpec)
            .then(resp => resp)
            .catch(error => error);
    },
    getObject(data: any) {
        return JSON.parse(JSON.stringify(data))
    }
};
