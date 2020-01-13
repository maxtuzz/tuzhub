import React from "react";
import styled from "styled-components";

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
`;

const SidebarMenuItem = styled.li`
    height: 40px;
    width: 100%; 
`;

const Icon = styled.svg`
    width: 20px;
    height: 20px;
`;

const SidebarMenuItemLabel = styled.p`
    font-family: "Open Sans", sans-serif;
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
                <Icon/>
                <SidebarMenuItemLabel>APIs</SidebarMenuItemLabel>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <Icon/>
                <SidebarMenuItemLabel>Configure</SidebarMenuItemLabel>
            </SidebarMenuItem>
        </SidebarMenu>
    </SidebarContainer>
);

export default Sidebar;