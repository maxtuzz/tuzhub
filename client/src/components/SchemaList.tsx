import React, {RefObject, useEffect} from "react";
import {OpenAPIV3} from "openapi-types";
import HeaderText from "./lib/HeaderText";
import styled from "styled-components";
import SchemaAccordion from "./lib/SchemaAccordion";

const ObjectsContainer = styled.div`
  margin-top: 50px;
`;

const ObjectListContainer = styled.div`
  padding-left: 20px;
  padding-right: 20px;
`;

interface SectionRefs {
    [pattern: string]: RefObject<any>
}

interface Props {
    components?: OpenAPIV3.ComponentsObject
    navPath?: string
}

/**
 * Renders a list of schema definitions for a spec
 * @param components
 * @param navPath
 * @constructor
 */
const SchemaList: React.FC<Props> = ({components, navPath}) => {
    const entries = components?.schemas && Object.entries(components?.schemas);

    const refs = entries && entries.reduce((prevRefs: SectionRefs, [key]) => {
        prevRefs[key] = React.createRef();

        return prevRefs;
    }, {});

    // Whenever nav path changes, scroll to schema in list
    useEffect(() => {
        if (navPath) {
            const ref = refs && refs[navPath];

            if (ref) {
                ref.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }
        }
    }, [navPath, refs]);

    return (
        <ObjectsContainer>
            <HeaderText>Objects</HeaderText>
            <ObjectListContainer>
                {
                    entries && entries.map(([schemaName, resource]) => {
                        const schema = resource as OpenAPIV3.SchemaObject;

                        return <div ref={refs && refs[schemaName]} key={schemaName}>
                            <SchemaAccordion
                                schemaName={schemaName}
                                schema={schema}
                                openWhen={schemaName === navPath}/>
                        </div>
                    })
                }
            </ObjectListContainer>
        </ObjectsContainer>
    );
};

export default SchemaList;