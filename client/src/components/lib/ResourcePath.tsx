import SubHeaderText from "./SubHeaderText";
import React, {useState} from "react";
import styled, {css} from "styled-components";
import {OpenAPIV3} from "openapi-types";
import ExpandableContent from "./ExpandableContent";
import RequestBodyView from "../RequestBodyView";
import ResponseBodyView from "../ResponseBodyView";
import Markdown from "./Markdown";
import Words from "./Words";
import FieldView from "../FieldView";

const AccordionContainer = styled.div`
  margin-bottom: 10px;
`;

const PathAccordionHeader = styled.div<{ open: boolean }>`
  padding: 10px 10px 30px 20px;
  transition: 0.3s;
  
  background-color: ${props => props.open && props.theme.colors.main};
  border-radius: 5px 5px 0 0;
  
  &:hover {
      color: #ffffff;
      cursor: pointer;
      background-color: ${props => props.theme.colors.main};
      border-radius: ${props => props.open ? `5px 5px 0 0` : `5px`};
  }
`;

const ExpandableResourceContent = styled(ExpandableContent)<{ open: boolean }>`
  border-radius: 0 0 5px 5px;
  background-color: ${props => props.theme.colors.main};
  padding: ${props => (props.open ? "15px 15px" : "0 15px")};
`;

const PathTextContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const VerbLabel = styled.code<{ verb?: Verb }>`
  color: rgb(166, 226, 46);
  font-weight: 800;
  
  ${props => props.verb === "POST" && css`
    color: coral;
  `}
  
  ${props => props.verb === "PUT" && css`
    color: #2f70ff;
  `}
  
  ${props => props.verb === "PATCH" && css`
    color: #ad78ff;
  `}
  
  ${props => props.verb === "DELETE" && css`
    color: #b20000;
  `}
`;

const PathLabel = styled.code`
  padding-left: 10px;
`;

const DescriptionHeader = styled.h4`
  margin-top: 0;
`;


type Verb = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface Props {
    endpoint: string
    verb: Verb
    pathItem: OpenAPIV3.PathItemObject
}

interface Functions {
    navTo: (resourcePath: string) => any
}

/**
 * Resource path component. Renders a resource button ala. GET /petsore. That can be expanded to view details
 * @param endpoint
 * @param verb
 * @param pathItem
 * @param navTo
 * @constructor
 */
const ResourcePath: React.FC<Props & Functions> = ({endpoint, verb, pathItem, navTo}) => {
    const [opened, setOpened] = useState(false);

    const getOperation: () => (OpenAPIV3.OperationObject | undefined) = () => {
        switch (verb) {
            case "GET":
                return pathItem.get;
            case "PUT":
                return pathItem.put;
            case "POST":
                return pathItem.post;
            case "PATCH":
                return pathItem.patch;
            case "DELETE":
                return pathItem.delete;
        }
    };

    const operation = getOperation();

    if (!operation) {
        return <Words>Error viewing OpenAPI</Words>;
    }

    const requestBody = operation.requestBody as OpenAPIV3.RequestBodyObject;
    const responseBody = operation.responses;
    const description = operation.description;

    const onClick = () => {
        setOpened(!opened);

        setTimeout(() => navTo(endpoint), 0)
    };

    return (
        <AccordionContainer>
            <PathAccordionHeader open={opened} onClick={onClick}>
                <SubHeaderText>{operation.summary}</SubHeaderText>
                <PathTextContainer>
                    <VerbLabel verb={verb}>{verb}</VerbLabel>
                    <PathLabel>{endpoint}</PathLabel>
                </PathTextContainer>
            </PathAccordionHeader>

            <ExpandableResourceContent open={opened}>
                {
                    description &&
                    <div>
                        <DescriptionHeader>Description</DescriptionHeader>
                        <Markdown source={description}/>
                    </div>
                }

                {
                    operation.parameters &&
                    <FieldView parameters={operation.parameters} noTopMargin={!description}/>
                }

                {
                    requestBody &&
                    <RequestBodyView requestBody={requestBody} noTopMargin={!description && !operation.parameters}/>
                }

                {
                    responseBody &&
                    <ResponseBodyView responseBody={responseBody}
                                      noTopMargin={!description && !requestBody && !operation.parameters}/>
                }
            </ExpandableResourceContent>
        </AccordionContainer>
    );
};

export default ResourcePath;