import React, {RefObject, useEffect, useState} from "react";
import {OpenAPIV3} from "openapi-types";
import HeaderText from "./lib/HeaderText";
import ResourcePath from "./lib/ResourcePath";
import SearchBar from "./lib/SearchBar";

interface Props {
    docPaths: OpenAPIV3.PathsObject
    navPath?: string
}

interface SectionRefs {
    [pattern: string]: RefObject<any>
}

const PathList: React.FC<Props> = ({docPaths, navPath}) => {
    const [filteredPaths, setFilteredPaths] = useState(docPaths);

    useEffect(() => {
        setFilteredPaths(docPaths);
    }, [docPaths]);

    const scrollTo = (ref: RefObject<any>) => {
        ref.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    };

    const searchInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value.toLowerCase();

        setFilteredPaths(
            Object.fromEntries(
                Object.entries(docPaths).filter(([key, resource]) => {
                    // Todo: add filter by verb
                    return resource.get?.summary?.toLowerCase().includes(searchTerm)
                        || resource.put?.summary?.toLowerCase().includes(searchTerm)
                        || resource.post?.summary?.toLowerCase().includes(searchTerm)
                        || resource.delete?.summary?.toLowerCase().includes(searchTerm)
                        || resource.patch?.summary?.toLowerCase().includes(searchTerm)
                        || key.includes(searchTerm)
                })
            )
        );
    };

    const refs = Object.entries(filteredPaths).reduce((prevRefs: SectionRefs, [key, val]) => {
        prevRefs[key] = React.createRef();

        return prevRefs;
    }, {});

    // Whenever nav path changes
    useEffect(() => {
        if (navPath) {
            setFilteredPaths(docPaths);

            Object.entries(refs).forEach(([key]) => {
                if (key.includes(navPath)) {
                    scrollTo(refs[key]);

                    return;
                }
            });
        }
    }, [navPath, refs, docPaths]);

    const scrollToResource = (resourcePath: string) => {
        const ref = refs[resourcePath];

        scrollTo(ref);
    };

    const paths = Object.entries(filteredPaths).map(([key, resource]) => (
            <div ref={refs[key]}>
                {
                    resource.get &&
                    <ResourcePath
                        endpoint={key}
                        verb="GET"
                        pathItem={resource}
                        navTo={(resourcePath => scrollToResource(resourcePath))}/>
                }
                {
                    resource.post &&
                    <ResourcePath
                        endpoint={key}
                        verb="POST"
                        pathItem={resource}
                        navTo={(resourcePath => scrollToResource(resourcePath))}/>
                }

                {
                    resource.put &&
                    <ResourcePath
                        endpoint={key}
                        verb="PUT"
                        pathItem={resource}
                        navTo={(resourcePath => scrollToResource(resourcePath))}/>
                }

                {
                    resource.patch &&
                    <ResourcePath
                        endpoint={key}
                        verb="PATCH"
                        pathItem={resource}
                        navTo={(resourcePath => scrollToResource(resourcePath))}/>
                }

                {
                    resource.delete &&
                    <ResourcePath
                        endpoint={key}
                        verb="DELETE"
                        pathItem={resource}
                        navTo={(resourcePath => scrollToResource(resourcePath))}/>
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