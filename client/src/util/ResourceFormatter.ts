import {OpenAPIV3} from "openapi-types";

class ResourceFormatter {
    static getPaths(docPaths: OpenAPIV3.PathsObject): string[] {
        let paths = new Set<string>();

        Object.entries(docPaths).forEach(([fullPath]) => {
            const resources = fullPath.split("/");

            resources.forEach(resource => {
                if (!resource.includes("{") && !resource.includes(":")) {
                    if (resource === "") {
                        return
                    }

                    paths.add(resource);
                }
            });
        });

        return Array.from(paths);
    }
}

export default ResourceFormatter