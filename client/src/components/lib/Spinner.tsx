import React from "react";
import styled from "styled-components";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import * as Icons from "@fortawesome/free-solid-svg-icons";

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const AnimatedIcon = styled(FontAwesomeIcon)`
   animation: spinner 1s linear infinite; 
  
  @keyframes spinner {
    to {
      transform: rotate(360deg); 
    }
  }
`;

/**
 * Renders a simple spinner icon
 * @constructor
 */
const Spinner: React.FC = () => (
    <SpinnerContainer>
        <AnimatedIcon icon={Icons.faSpinner} color={"white"}/>
    </SpinnerContainer>
);

export default Spinner;