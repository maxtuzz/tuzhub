import styled, {css} from "styled-components";
import React from "react";

const StyledButton = styled.div`
  display: flex;
  align-items: center;
  padding: 1.2em 2em;
  border-radius: 2px;
  
  &:hover {
    color: #ffffff;
    cursor: pointer;  
    background: rgba(255, 255, 255, 0.05);
  }
`;

const TabUnderline = styled.div<{ active: boolean }>`
  width: 100%;
  transform: scaleX(0);
  
  ${props => props.active && css`
    transform: scaleX(1);
  `};
  
  height: 2px;
  background-color: ${props => props.theme.colors.active};
  transition: transform .3s ease-in-out;
  
  ${StyledButton}:hover & {
    transform: scaleX(1);
  }
`;

interface Props {
    label: string
    isActive: boolean
}

interface Functions {
    onClick: () => void
}

const TabButton: React.FC<Props & Functions> = ({label, isActive, onClick}) => (
    <div>
        <StyledButton onClick={onClick}>
            {label}
        </StyledButton>
        <TabUnderline active={isActive}/>
    </div>
);

export default TabButton;