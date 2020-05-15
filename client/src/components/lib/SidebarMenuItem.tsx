import styled, {css} from "styled-components";

const activeStyle = css`
  color: #ffffff;
  cursor: pointer;
  background:  ${props => props.theme.colors.sidebarHighlight};
  box-shadow: inset 3px 0 0 0 ${props => props.theme.colors.active};;
`

export const SidebarMenuItemLabel = styled.p<{ active?: boolean }>`
    font-family: "Roboto", sans-serif;
    font-size: 14px;
    line-height: 1.3;
    font-weight: 600; 
    text-align: left;
    margin-left: 20px;
    margin-right: 20px;
    
    ${props => props.active && css`
      color: #FFF;
      text-decoration: underline;
    `};
    
    @media (max-width: 1126px) {
      display: none;
    }
`;

const SidebarMenuItem = styled.li<{ selected?: boolean }>`
    display: flex;
    align-items: center;
    padding-left: 2em;
    height: 40px;
    max-width: 16em;
    color: ${props => props.theme.colors.words};
    transition: all 0.3s ease-out;
    
    &:hover {
      ${activeStyle}
    }
    
    ${props => props.selected && activeStyle}
    
`;

export default SidebarMenuItem;