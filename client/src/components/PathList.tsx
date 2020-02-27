import React, {useEffect, useState} from "react";
import {OpenAPIV3} from "openapi-types";
import HeaderText from "./lib/HeaderText";
import ResourcePath from "./lib/ResourcePath";
import SearchBar from "./lib/SearchBar";

interface Props {
    docPaths: OpenAPIV3.PathsObject
    navPath?: string
}

interface SectionRefs {
    [pattern: string]: any
}

const PathList: React.FC<Props> = ({docPaths, navPath}) => {
    const [filteredPaths, setFilteredPaths] = useState(docPaths);

    useEffect(() => {
        setFilteredPaths(docPaths);
    }, [docPaths]);

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
        console.log("pathChanged")

        if (navPath) {
            Object.entries(refs).forEach(([key]) => {
                if (key.includes(navPath)) {
                    refs[key].current.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                    });

                    return;
                }
            });
        }
    }, [navPath]);

    const resourceClicked = (key: string) => {
        const current = refs[key].current;

        current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    };

    const paths = Object.entries(filteredPaths).map(([key, resource]) => (
            <div onClick={() => resourceClicked(key)} ref={refs[key]}>
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