import React, {useEffect, useState} from "react";
import {OpenAPIV3} from "openapi-types";
import HeaderText from "./lib/HeaderText";
import ResourcePath from "./lib/ResourcePath";
import SearchBar from "./lib/SearchBar";

interface Props {
    docPaths: OpenAPIV3.PathsObject
}

const PathList: React.FC<Props> = ({docPaths}) => {
    const [filteredPaths, setFilteredPaths] = useState(docPaths);

    useEffect(() => {
        setFilteredPaths(docPaths);
    }, [docPaths]);

    const searchInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value;

        setFilteredPaths(
            Object.fromEntries(
                Object.entries(docPaths).filter(([key, resource]) => {
                    // Todo: add filter by verb
                    return resource.get?.summary?.includes(searchTerm)
                        || resource.put?.summary?.includes(searchTerm)
                        || resource.post?.summary?.includes(searchTerm)
                        || resource.delete?.summary?.includes(searchTerm)
                        || resource.patch?.summary?.includes(searchTerm)
                        || key.includes(searchTerm)
                })
            )
        );
    };

    const paths = Object.entries(filteredPaths).map(([key, resource]) => (
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
            <SearchBar onChange={searchInputChanged} placeholder={"Search resources"}/>
            {paths}
        </div>
    );
};

export default PathList;