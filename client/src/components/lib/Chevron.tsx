import React from "react";
import styled from "styled-components";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/free-solid-svg-icons";

const ChevronContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ChevronLabel = styled.div`
  margin-right: 10px;
  font-weight: 400;
`;

const ChevronIcon = styled(FontAwesomeIcon)<{ open: boolean }>`
  transition: all 0.3s ease-out;
  transform: ${props => (props.open ? "rotate(90deg)" : "rotate(0deg)")};
`;

interface Props {
    open: boolean
    labeled?: boolean
}

const Chevron: React.FC<Props> = ({open, labeled = false}) => (
    <ChevronContainer>
        {
            labeled && <ChevronLabel>{open ? "Hide" : "Show"}</ChevronLabel>
        }
        <ChevronIcon open={open} icon={Icons.faChevronRight} size={"sm"}/>
    </ChevronContainer>
);

export default Chevron;