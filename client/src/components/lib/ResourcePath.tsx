import SubHeaderText from "./SubHeaderText";
import React, {useState} from "react";
import styled, {css} from "styled-components";
import {OpenAPIV3} from "openapi-types";
import Words from "./Words";
import ExpandableContent from "./ExpandableContent";
import RequestBodyView from "../RequestBodyView";
import ResponseBodyView from "../ResponseBodyView";

const AccordionContainer = styled.div`
  margin-bottom: 10px;
`;

const PathAccordionHeader = styled.div<{ open: boolean }>`
  padding: 10px 10px 30px 20px;
  transition: 0.3s;
  
  background-color: ${props => props.open && `rgba(255, 255, 255, 0.05)`};
  border-radius: 5px 5px 0 0;
  
  &:hover {
      color: #ffffff;
      cursor: pointer;
      background-color: rgba(255, 255, 255, 0.05);
      border-radius: ${props => props.open ? `5px 5px 0 0` : `5px`};
  }
`;

const ExpandableResourceContent = styled(ExpandableContent)<{ open: boolean }>`
  border-radius: 0 0 5px 5px;
  background-color: rgba(255, 255, 255, 0.05);
  padding: ${props => (props.open ? "15px 15px" : "0 15px")};
`;

const PathTextContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const VerbLabel = styled.code<{ verb?: Verb }>`
  color: #349d00;
  font-weight: 800;
  
  ${props => props.verb === "POST" && css`
    color: coral;
  `}
  
  ${props => props.verb === "PUT" && css`
    color: #2f70ff;
  `}
  
  ${props => props.verb === "DELETE" && css`
    color: darkred;
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

const ResourcePath: React.FC<Props> = ({endpoint, verb, pathItem}) => {
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
                return pathItem.put;
            case "DELETE":
                return pathItem.delete;
        }
    };

    const requestBody = getOperation()?.requestBody as OpenAPIV3.RequestBodyObject | undefined;

    const description = getOperation()?.description;

    return (
        <AccordionContainer>
            <PathAccordionHeader open={opened} onClick={() => setOpened(!opened)}>
                <SubHeaderText>{getOperation()?.summary}</SubHeaderText>
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
                        <Words>{getOperation()?.description}</Words>
                    </div>
                }

                {
                    requestBody && <RequestBodyView requestBody={requestBody} noTopMargin={!description}/>
                }

                {
                    getOperation()?.responses && <ResponseBodyView responseBody={getOperation()?.responses}
                                                                   noTopMargin={!description}/>
                }
            </ExpandableResourceContent>
        </AccordionContainer>
    );
};

export default ResourcePath;