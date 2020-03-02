import React from "react";
import {OpenAPIV3} from "openapi-types";
import HeaderText from "./components/lib/HeaderText";
import styled from "styled-components";
import ObjectAccordion from "./components/lib/ObjectAccordion";

const ObjectsContainer = styled.div`
  margin-top: 50px;
`;

const ObjectListContainer = styled.div`
  padding-left: 20px;
  padding-right: 20px;
`;

interface Props {
    components?: OpenAPIV3.ComponentsObject
}

const ObjectList: React.FC<Props> = ({components}) => {
    if (!components) return <></>;

    return (
        <ObjectsContainer>
            <HeaderText>Objects</HeaderText>
            <ObjectListContainer>
                {
                    components.schemas
                    && Object.entries(components?.schemas).map(([key, resource]) => {
                        const schema = resource as OpenAPIV3.SchemaObject;

                        return <ObjectAccordion schemaName={key} schema={schema}/>
                    })
                }
            </ObjectListContainer>
        </ObjectsContainer>
    );
};

export default ObjectList;