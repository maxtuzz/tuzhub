import React from "react";
import {OpenAPIV3} from "openapi-types";
import HeaderText from "./lib/HeaderText";
import ResourcePath from "./lib/ResourcePath";


interface Props {
    docPaths: OpenAPIV3.PathsObject
}

const PathList: React.FC<Props> = ({docPaths}) => {
    const paths = Object.entries(docPaths).map(([key, resource]) => (
            <div>
                {
                    resource.get &&
                    <ResourcePath endpoint={key} verb="GET" pathItem={resource}/>
                }
                {
                    resource.post &&
                    <ResourcePath endpoint={key} verb="POST" pathItem={resource}/>
                }

                {
                    resource.put &&
                    <ResourcePath endpoint={key} verb="PUT" pathItem={resource}/>
                }

                {
                    resource.delete &&
                    <ResourcePath endpoint={key} verb="DELETE" pathItem={resource}/>
                }

            </div>
        )
    );

    return (
        <div>
            <HeaderText>Resources</HeaderText>
            {paths}
        </div>
    );
};

export default PathList;