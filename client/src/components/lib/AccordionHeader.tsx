import styled from "styled-components";
import React from "react";
import Chevron from "./Chevron";

const AccordionHeaderContainer = styled.div<{ noTopMargin?: boolean }>`
  margin-top: ${props => props.noTopMargin ? 0 : 24}px;
  
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  
  &:hover {
     cursor: pointer;
     border-radius: 2px;
  }
`;

const AccordionHeaderStyled = styled.h4`
  margin-top: 0;
  margin-bottom: 0;
`;

interface Props {
    open: boolean
    noTopMargin?: boolean
    labeled?: boolean
    children: string
}

interface Functions {
    onClick: () => any
}

const AccordionHeader: React.FC<Props & Functions> = ({open, noTopMargin, children, labeled = false, onClick}) => (
    <AccordionHeaderContainer onClick={onClick} noTopMargin={noTopMargin}>
        <AccordionHeaderStyled>
            {children}
        </AccordionHeaderStyled>
        <Chevron open={open} labeled={labeled}/>
    </AccordionHeaderContainer>
);

export default AccordionHeader;