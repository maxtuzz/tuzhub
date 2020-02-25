import styled from "styled-components";

export const SidebarMenuItemLabel = styled.p`
    font-family: "Roboto", sans-serif;
    font-size: 14px;
    line-height: 1.3;
    font-weight: 600; 
    text-align: left;
    margin-left: 20px;
    
    @media (max-width: 1126px) {
      display: none;
    }
`;

const SidebarMenuItem = styled.li`
    display: flex;
    align-items: center;
    height: 40px;
    width: 100%;
    color: #b9bbbe;
    padding-left: 30px;
    
    &:hover {
      color: #ffffff;
      cursor: pointer;
      background: rgba(255, 255, 255, 0.05);
      box-shadow: inset 3px 0 0 0 #51aec0;
    }
`;

export default SidebarMenuItem;