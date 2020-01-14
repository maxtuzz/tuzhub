import React from "react";
import styled from "styled-components";
import SvgIcon from "./lib/SvgIcon";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import * as Icons from "@fortawesome/free-solid-svg-icons"
import ApiIcon from "./lib/ApiIcon";

const SidebarContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    list-style: none;
    height: 100vh;
    width: 300px;
    background-color: #252529;
 `;

const SidebarMenu = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;  
    list-style: none;
    padding-inline-start: 0;
`;

const SidebarHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 16px;
    font-size: 18px;
    font-weight: 600;
    line-height: 1.5px;
    color: #FFF;
    margin: 10px 30px 30px 0;
    padding-left: 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid #2e2e33;
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
      box-shadow: inset 3px 0 0 0 #ffffff;
    }
`;

const Divider = styled.hr`
  width: 90%;
  height: 2px;
  box-sizing: border-box;
  border-style: solid;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const SidebarMenuItemLabel = styled.p`
    font-family: "Roboto", sans-serif;
    font-size: 14px;
    line-height: 1.3;
    font-weight: 600; 
    text-align: left;
    margin-left: 20px;
`;

/**
 * Renders the side bar for navigation
 * @constructor
 */
const Sidebar: React.FC = () => (
    <SidebarContainer>
        <SidebarMenu>
            <SidebarHeader>
                {" "}
                <FontAwesomeIcon icon={Icons.faLessThanEqual} color={"white"} size={"lg"}/>
                Dev Portal
            </SidebarHeader>
            <SidebarMenuItem>
                <ApiIcon/>
                <SidebarMenuItemLabel>APIs</SidebarMenuItemLabel>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <FontAwesomeIcon icon={Icons.faChartLine} color={"white"} size={"lg"}/>
                <SidebarMenuItemLabel>Metrics</SidebarMenuItemLabel>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <FontAwesomeIcon icon={Icons.faCogs} color={"white"}/>
                <SidebarMenuItemLabel>Configure</SidebarMenuItemLabel>
            </SidebarMenuItem>

            <Divider/>
        </SidebarMenu>
        <SidebarMenu>
            <SidebarMenuItem>
                <SvgIcon/>
                <SidebarMenuItemLabel>-> This section changes based on navigation state</SidebarMenuItemLabel>
            </SidebarMenuItem>
        </SidebarMenu>
    </SidebarContainer>
);

export default Sidebar;