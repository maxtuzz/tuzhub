import React from "react";
import {OpenAPIV3} from "openapi-types";
import HeaderText from "./lib/HeaderText";
import SubHeaderText from "./lib/SubHeaderText";
import styled, {css} from "styled-components";

const PathContainer = styled.div`
  margin-bottom: 50px;
`;

const PathTextContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const VerbText = styled.code<{ put?: boolean, post?: boolean, delete?: boolean }>`
  color: #4cff43;
  
  ${props => props.post && css`
    color: coral;
  `}
  
  ${props => props.put && css`
    color: #2f70ff;
  `}
  
  ${props => props.delete && css`
    color: darkred;
  `}
`;

const PathText = styled.code`
  padding-left: 10px;
`;


interface Props {
    docPaths: OpenAPIV3.PathsObject
}

const PathList: React.FC<Props> = ({docPaths}) => {
    let paths: Array<JSX.Element> = [];

    const getVerbText = (resource: any) => {
        return <VerbText>GET</VerbText>;
    };

    for (let key in docPaths) {
        const resource: OpenAPIV3.PathItemObject = docPaths[key];

        paths.push(
            <div>
                {
                    resource.get &&
                    <PathContainer>
                        <SubHeaderText>{resource.get?.summary}</SubHeaderText>
                        <PathTextContainer>
                            <VerbText>GET</VerbText>
                            <PathText>{key}</PathText>
                        </PathTextContainer>
                    </PathContainer>
                }
                {
                    resource.post &&
                    <PathContainer>
                        <SubHeaderText>{resource.post?.summary}</SubHeaderText>
                        <PathTextContainer>
                            <VerbText post>POST</VerbText>
                            <PathText>{key}</PathText>
                        </PathTextContainer>
                    </PathContainer>
                }

                {
                    resource.put &&
                    <PathContainer>
                        <SubHeaderText>{resource.put?.summary}</SubHeaderText>
                        <PathTextContainer>
                            <VerbText>PUT</VerbText>
                            <PathText>{key}</PathText>
                        </PathTextContainer>
                    </PathContainer>
                }

                {
                    resource.delete &&
                    <PathContainer>
                        <SubHeaderText>{resource.delete?.summary}</SubHeaderText>
                        <PathTextContainer>
                            <VerbText delete>DELETE</VerbText>
                            <PathText>{key}</PathText>
                        </PathTextContainer>
                    </PathContainer>
                }

            </div>
        )
    }

    return (
        <div>
            <HeaderText>Resources</HeaderText>
            {paths}
        </div>
    );
};

export default PathList;