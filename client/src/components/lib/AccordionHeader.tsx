import styled from "styled-components";
import React from "react";
import Chevron from "./Chevron";

const AccordionHeaderContainer = styled.div<{ noTopMargin?: boolean, open: boolean }>`
  margin-top: ${props => props.noTopMargin ? 0 : 24}px;
  
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: ${props => props.open ? "#ffffff" : props.theme.colors.words};
  transition: all 0.2s ease-out;
  
  &:hover {
     color: #ffffff;
     cursor: pointer;
     border-radius: 2px;
  }
`;

const AccordionHeaderStyled = styled.h4`
  margin-top: 0;
  margin-bottom: 10px;
`;

interface Props {
    open: boolean
    noTopMargin?: boolean
    labeledChevron?: boolean
    children: string
}

interface Functions {
    onClick: () => any
}

type HeaderProps = Props & Functions;

const AccordionHeader: React.FC<HeaderProps> = ({open, noTopMargin, children, labeledChevron = false, onClick}) => (
    <AccordionHeaderContainer onClick={onClick} noTopMargin={noTopMargin} open={open}>
        <AccordionHeaderStyled>
            {children}
        </AccordionHeaderStyled>
        <Chevron open={open} labeled={labeledChevron}/>
    </AccordionHeaderContainer>
);

export default AccordionHeader;