import styled, {css} from "styled-components";
import React from "react";

const TabButton = styled.div`
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
  width: 0;
  
  ${props => props.active && css`
    width: 100%;
  `};
  
  height: 2px;
  background-color: #51aec0;
  transition: width .3s ;
  
  ${TabButton}:hover & {
    width: 100%;
  }
`;

interface Props {
    isActive: boolean
    children: string
}

interface Functions {
    onClick: () => void
}

const Tab: React.FC<Props & Functions> = ({isActive, children, onClick}) => (
    <div>
        <TabButton onClick={onClick}>
            {children}
        </TabButton>
        <TabUnderline active={isActive}/>
    </div>
);

export default Tab;