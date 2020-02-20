import React, {useEffect} from "react";
import ApiEntry from "../model/ApiEntry";
import PageTitle from "./lib/PageTitle";
import Words from "./lib/Words";
import styled from "styled-components";
import {fadeInBottom} from "../styling/anims";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const VersionTagContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 35px;
  height: 30px;
  border-radius: 15px;
  
  padding-left: 10px;
  padding-right: 10px;
  
  background-color: green;
  font-weight: 600;
  
  ${fadeInBottom}
`;

interface Props {
    apiEntry: ApiEntry | undefined
    specVersion?: string
    specDescription?: string
}

interface Functions {
    loadApi: () => void;
}

type ApiInfoProps = Props & Functions;

const ApiInfo: React.FC<ApiInfoProps> = ({apiEntry, loadApi, specVersion, specDescription}) => {
    useEffect(() => {
        loadApi();
    }, [loadApi]);

    if (!apiEntry) {
        return <Words>Loading...</Words>
    }

    return (
        <div>
            <HeaderContainer>
                <PageTitle>{apiEntry.displayName}</PageTitle>
                {
                    specVersion &&
                    <VersionTagContainer>
                        Spec: {specVersion}
                    </VersionTagContainer>
                }
            </HeaderContainer>
            <Words>{apiEntry?.description}</Words>
        </div>
    );
};

export default ApiInfo;