import React from "react";
import ApiSpec from "../model/ApiSpec";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/free-solid-svg-icons";
import SidebarMenuItem, {SidebarMenuItemLabel} from "./lib/SidebarMenuItem";
import styled from "styled-components";
import {fadeInTop, fadeOutTop} from "../styling/anims";

const NavItemsContainer = styled.div<{ out: boolean }>`
  width: 100%;
  visibility: ${props => props.out ? 'hidden' : 'visible'};
  animation: ${props => props.out ? fadeOutTop : fadeInTop} 0.1s linear;
  transition: visibility 0.1s linear;
`;

interface Props {
    apiSpec?: ApiSpec;
}

const SpecNavItems: React.FC<Props> = ({apiSpec}) => {
    return (
        <NavItemsContainer out={!apiSpec}>
            <SidebarMenuItem>
                <FontAwesomeIcon icon={Icons.faChevronRight} color={"white"}/>
                <SidebarMenuItemLabel>Resources</SidebarMenuItemLabel>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <FontAwesomeIcon icon={Icons.faChevronRight} color={"white"}/>
                <SidebarMenuItemLabel>Objects</SidebarMenuItemLabel>
            </SidebarMenuItem>
        </NavItemsContainer>
    );
};

export default SpecNavItems;