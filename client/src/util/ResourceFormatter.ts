import {OpenAPIV3} from "openapi-types";

class ResourceFormatter {
    static getPaths(docPaths: OpenAPIV3.PathsObject): string[] {
        let paths = new Set<string>();

        Object.entries(docPaths).forEach(([key]) => {
            const resources = key.split("/");

            resources.forEach(resource => {
                if (!resource.includes("{") && !resource.includes(":")) {
                    if (resource === "") {
                        resource = "/";
                    }

                    paths.add(resource);
                }
            });
        });


        return Array.from(paths);
    }
}

export default ResourceFormatter