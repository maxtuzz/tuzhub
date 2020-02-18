import styled from "styled-components";
import React from "react";
import * as Icons from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const AccordionHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  
  &:hover {
     cursor: pointer;
     border-radius: 2px;
  }
`;

const ChevronIcon = styled(FontAwesomeIcon)<{open: boolean}>`
  transition: all 0.3s ease-out;
  transform: ${props => (props.open ? `rotate(90deg)` : "rotate(0deg)")};
`;

const AccordionHeaderStyled = styled.h4<{ noTopMargin?: boolean }>`
  margin-top: ${props => props.noTopMargin && 0};
  margin-bottom: 0;
  line-height: 30px;
`;

interface Props {
    open: boolean
    noTopMargin?: boolean
    children: string
    onClick: () => any
}

const AccordionHeader: React.FC<Props> = ({open, noTopMargin, children, onClick}) => (
    <AccordionHeaderContainer onClick={onClick}>
        <AccordionHeaderStyled noTopMargin={noTopMargin}>
            {children}
        </AccordionHeaderStyled>
        <ChevronIcon open={open} icon={Icons.faChevronRight} size={"sm"}/>
    </AccordionHeaderContainer>
);

export default AccordionHeader;