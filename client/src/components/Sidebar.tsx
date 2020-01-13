import React from "react";
import styled from "styled-components";
import SvgIcon from "./lib/SvgIcon";

const SidebarContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    height: 100vh;
    width: 270px;
    background-color: #252529;
    color: #fff;  
 `;

const SidebarMenu = styled.ul`
    display: flex;
    align-items: center;
    flex-direction: column;
    list-style: none;
    width: 100%;
    padding: 0 30px;
`;

const SidebarMenuItem = styled.li`
    height: 40px;
    width: 100%;
    font-weight: 600; 
    
    &:hover {
      background: rgba(255, 255, 255, 0.05);
      box-shadow: inset 3px 0 0 0 #ffffff;
      cursor: pointer;
    }
`;

const SidebarMenuItemLabel = styled.p`
    font-family: "Roboto", sans-serif;
    font-size: 14px;
    line-height: 1.5;
    font-weight: 500;
    text-align: left;
    color: #ffffff;
`;

/**
 * Renders the side bar for navigation
 * @constructor
 */
const Sidebar: React.FC = () => (
    <SidebarContainer>
        <SidebarMenu>
            <SidebarMenuItem>
                <SvgIcon/>
                <SidebarMenuItemLabel>APIs</SidebarMenuItemLabel>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SvgIcon/>
                <SidebarMenuItemLabel>Configure</SidebarMenuItemLabel>
            </SidebarMenuItem>
        </SidebarMenu>
    </SidebarContainer>
);

export default Sidebar;