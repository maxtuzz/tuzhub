import React from "react";
import {Lottie} from "@crello/react-lottie";
import animationData from "../assets/animations/api-loading.json";
import styled from "styled-components";

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const LoadingSpinner: React.FC = () => (
    <SpinnerContainer>
        <Lottie config={defaultOptions} height="400px" width="400px"/>
    </SpinnerContainer>
);

export default LoadingSpinner;