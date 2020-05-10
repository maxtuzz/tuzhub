import React, {useState} from "react";
import styled from "styled-components";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import * as Icons from "@fortawesome/free-solid-svg-icons"
import {Link, useLocation} from "react-router-dom";
import {delayedWiggle, fadeInTopCss} from "../styling/anims";
import SidebarMenuItem, {SidebarMenuItemLabel} from "./lib/SidebarMenuItem";
import SpecNavContainer from "../containers/SpecNavContainer";

const SidebarContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    position: fixed;
    list-style: none;
    height: 100vh;
    background-color: ${props => props.theme.colors.sidebarColor};
    max-width: 260px;
    overflow-y: hidden;
 `;

const SidebarMenu = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    list-style: none;
    padding-inline-start: 0;
    // Todo: White box
    overflow-x: hidden;  
    overflow-y: auto;
    scrollbar-color: ${props => props.theme.colors.secondary} ${props => props.theme.colors.sidebarColor};
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
    width: 12rem;
    
    @media (max-width: 1126px) {
      width: 1.2rem;
    }
    
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

const MenuDivider = styled.hr`
  width: 90%;
  height: 2px;
  box-sizing: border-box;
  border-style: solid;
  margin-top: 20px;
  margin-bottom: 20px;
  color: #848689;
`;

const StyledLink = styled(Link)<{ width?: string, height?: string }>`
    text-decoration: none;
    height: ${props => props.height ? props.height : "40px"};
    width: ${props => props.width ? props.width : "100%"};
`;

const LinkApiMenuItem = styled(SidebarMenuItem)`
  padding-left: 1rem;
  
  ${fadeInTopCss}
  
  &:hover {
    cursor: pointer;
    color: #FFFF;
    background: 0;
    box-shadow: none;
  }
`;

const LinkIcon = styled(FontAwesomeIcon)`
  margin-left: 20px;
`;

/**
 * Renders the side bar for navigation
 * @constructor
 */
const Sidebar: React.FC = () => {
    let {pathname} = useLocation();

    const [activeLink, setActiveLink] = useState(pathname);

    const apiPath = "/apis";
    const metricsPath = "/metrics";
    const configPath = "/config";

    return (
        <SidebarContainer>
            <SidebarMenu>
                <SidebarHeader to="/" onClick={() => setActiveLink("")}>
                    <SidebarHeaderIcon icon={Icons.faLessThanEqual} color={"white"} size={"lg"}/>
                    <SidebarHeaderLabel>
                        Tuzhub.io
                    </SidebarHeaderLabel>
                </SidebarHeader>
                <StyledLink to={apiPath} onClick={() => setActiveLink(apiPath)}>
                    <SidebarMenuItem selected={activeLink === apiPath}>
                        <FontAwesomeIcon icon={Icons.faProjectDiagram} color={"white"}/>
                        <SidebarMenuItemLabel>APIs</SidebarMenuItemLabel>
                    </SidebarMenuItem>
                </StyledLink>
                <StyledLink to={metricsPath} onClick={() => setActiveLink(metricsPath)}>
                    <SidebarMenuItem selected={activeLink === metricsPath}>
                        <FontAwesomeIcon icon={Icons.faChartLine} color={"white"} size={"lg"}/>
                        <SidebarMenuItemLabel>Metrics</SidebarMenuItemLabel>
                    </SidebarMenuItem>
                </StyledLink>
                <StyledLink to={configPath} onClick={() => setActiveLink(configPath)}>
                    <SidebarMenuItem selected={activeLink === configPath}>
                        <FontAwesomeIcon icon={Icons.faCogs} color={"white"}/>
                        <SidebarMenuItemLabel>Configure</SidebarMenuItemLabel>
                    </SidebarMenuItem>
                </StyledLink>
                <MenuDivider/>
                {
                    pathname.endsWith(apiPath) &&
                    <StyledLink to={`${apiPath}/new`}>
                        <LinkApiMenuItem>
                            <SidebarMenuItemLabel>Link API</SidebarMenuItemLabel>
                            <LinkIcon icon={Icons.faPlus} color={"gray"}/>
                        </LinkApiMenuItem>
                    </StyledLink>
                }

                <SpecNavContainer/>
            </SidebarMenu>
            <SidebarMenuItem>
                <FontAwesomeIcon icon={Icons.faQuestionCircle} color={"white"}/>
                <SidebarMenuItemLabel>About</SidebarMenuItemLabel>
            </SidebarMenuItem>
        </SidebarContainer>
    );
};

export default Sidebar;