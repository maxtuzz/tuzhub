import React, {useEffect} from "react";
import ApiEntry from "../model/ApiEntry";
import PageTitle from "./lib/PageTitle";
import Words from "./lib/Words";
import styled from "styled-components";
import {fadeInBottomCss} from "../styling/anims";
import * as animationData from '../assets/animations/api-loading.json';
import Lottie from 'react-lottie';

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
  
  &:hover {
    cursor: pointer;
  }
  
  ${fadeInBottomCss}
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

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
    };

    if (!apiEntry) {
        return  <Lottie options={defaultOptions}
                        height={400}
                        width={400}/>;
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