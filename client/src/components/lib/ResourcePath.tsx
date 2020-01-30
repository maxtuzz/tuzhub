import SubHeaderText from "./SubHeaderText";
import React from "react";
import styled, {css} from "styled-components";
import {OpenAPIV3} from "openapi-types";

const PathContainer = styled.div`
  margin-bottom: 10px;
  padding: 10px 10px 30px 20px;
  
  &:hover {
      color: #ffffff;
      cursor: pointer;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 10px;
  }
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

type Verb = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface Props {
    endpoint: string
    verb: Verb
    pathItem: OpenAPIV3.PathItemObject
}

const ResourcePath: React.FC<Props> = ({endpoint, verb, pathItem}) => {
    const getOperation: () => (OpenAPIV3.OperationObject | undefined)  = () => {
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

    return (
        <PathContainer>
            <SubHeaderText>{getOperation()?.summary}</SubHeaderText>
            <PathTextContainer>
                <VerbLabel verb={verb}>{verb}</VerbLabel>
                <PathLabel>{endpoint}</PathLabel>
            </PathTextContainer>
        </PathContainer>
    );
};

export default ResourcePath;