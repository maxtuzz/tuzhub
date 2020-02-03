import React from "react";
import styled from "styled-components";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import * as Icons from "@fortawesome/free-solid-svg-icons"
import {Link} from "react-router-dom";
import {delayedWiggle} from "../styling/anims";

const SidebarContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: fixed;
    list-style: none;
    height: 100vh;
    background-color: #2c2c30;
    overflow-y: scroll;
    overflow-x: hidden;
 `;

const SidebarMenu = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    list-style: none;
    padding-inline-start: 0;
`;

const SidebarHeader = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    text-decoration: none;
    font-size: 16px;
    color: #FFF;
    margin: 10px 30px 30px 0;
    padding-left: 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid #2e2e33;
    
    ${delayedWiggle}
`;

const SidebarHeaderLabel = styled.div`
  font-size: 15px;
  text-transform: uppercase;
  font-weight: 800;
  
  @media (max-width: 1126px) {
      display: none;
  }
`;

const SidebarHeaderIcon = styled(FontAwesomeIcon)`
    padding-right: 16px;
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

const MenuDivider = styled.hr`
  width: 90%;
  height: 2px;
  box-sizing: border-box;
  border-style: solid;
  margin-top: 20px;
  margin-bottom: 20px;
  color: #848689;
`;

const SidebarMenuItemLabel = styled.p`
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

const StyledLink = styled(Link)<{ width?: string, height?: string }>`
    text-decoration: none;
    height: ${props => props.height ? props.height : "40px"};
    width: ${props => props.width ? props.width : "100%"};
`;

/**
 * Renders the side bar for navigation
 * @constructor
 */
const Sidebar: React.FC = () => {
    const elements: Array<JSX.Element> = [];

    for (let i = 0; i < 30; i++) {
        elements.push(
            <SidebarMenuItem key={i}>
                <FontAwesomeIcon icon={Icons.faCogs} color={"white"}/>
                <SidebarMenuItemLabel>Test item #{i}</SidebarMenuItemLabel>
            </SidebarMenuItem>
        )
    }

    return (
        <SidebarContainer>
            <SidebarMenu>
                <SidebarHeader to="/">
                    <SidebarHeaderIcon icon={Icons.faLessThanEqual} color={"white"} size={"lg"}/>

                    <SidebarHeaderLabel>
                        Tuzzy Dev Portal
                    </SidebarHeaderLabel>
                </SidebarHeader>
                <StyledLink to="/apis">
                    <SidebarMenuItem>
                        {/*<ApiIcon/>*/}
                        <FontAwesomeIcon icon={Icons.faProjectDiagram} color={"white"}/>
                        <SidebarMenuItemLabel>APIs</SidebarMenuItemLabel>
                    </SidebarMenuItem>
                </StyledLink>
                <StyledLink to="/metrics">
                    <SidebarMenuItem>
                        <FontAwesomeIcon icon={Icons.faChartLine} color={"white"} size={"lg"}/>
                        <SidebarMenuItemLabel>Metrics</SidebarMenuItemLabel>
                    </SidebarMenuItem>
                </StyledLink>
                <StyledLink to="/config">
                    <SidebarMenuItem>
                        <FontAwesomeIcon icon={Icons.faCogs} color={"white"}/>
                        <SidebarMenuItemLabel>Configure</SidebarMenuItemLabel>
                    </SidebarMenuItem>
                </StyledLink>
                <MenuDivider/>
            </SidebarMenu>
            <SidebarMenu>
                {
                    elements
                }
            </SidebarMenu>
        </SidebarContainer>
    );
};

export default Sidebar;