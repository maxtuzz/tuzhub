import React, {useState} from "react";
import SidebarMenuItem, {SidebarMenuItemLabel} from "./lib/SidebarMenuItem";
import styled from "styled-components";
import {fadeInTop, fadeOutTop} from "../styling/anims";
import ExpandableContent from "./lib/ExpandableContent";
import Chevron from "./lib/Chevron";
import {OpenAPIV3} from "openapi-types";
import ResourceFormatter from "../util/ResourceFormatter";

const NavItemsContainer = styled.div<{ out: boolean }>`
  width: 100%;
  visibility: ${props => props.out ? 'hidden' : 'visible'};
  animation: ${props => props.out ? fadeOutTop : fadeInTop} 250ms linear;
  transition: visibility 200ms linear;
  
  @media (max-width: 1126px) {
      display: none;
  }
`;

interface Props {
    apiDoc?: OpenAPIV3.Document;
}

const SpecNavItems: React.FC<Props> = ({apiDoc}) => {
    const [resourcesOpen, setResourcesOpen] = useState(apiDoc?.tags != undefined);
    const [objectsOpen, setObjectsOpen] = useState(true);

    const resources = apiDoc?.paths && ResourceFormatter.getPaths(apiDoc?.paths).map(path =>
        <SidebarMenuItem>
            <span>&#8226;</span>
            <SidebarMenuItemLabel>{path}</SidebarMenuItemLabel>
        </SidebarMenuItem>
    );

    return (
        <NavItemsContainer out={!apiDoc}>
            <SidebarMenuItem onClick={() => setResourcesOpen(!resourcesOpen)}>
                <Chevron open={resourcesOpen}/>
                <SidebarMenuItemLabel>Resources</SidebarMenuItemLabel>
            </SidebarMenuItem>
            <ExpandableContent open={resourcesOpen}>
                {
                    resources
                }
            </ExpandableContent>

            <SidebarMenuItem onClick={() => setObjectsOpen(!objectsOpen)}>
                <Chevron open={objectsOpen}/>
                <SidebarMenuItemLabel>Objects</SidebarMenuItemLabel>
            </SidebarMenuItem>
            <ExpandableContent open={objectsOpen}>

                {
                    apiDoc?.components?.schemas
                    && Object.entries(apiDoc?.components?.schemas).map(([key, value]) => (
                        <SidebarMenuItem>
                            <span>&#8226;</span>
                            <SidebarMenuItemLabel>{key}</SidebarMenuItemLabel>
                        </SidebarMenuItem>
                    ))
                }
            </ExpandableContent>
        </NavItemsContainer>
    );
};

export default SpecNavItems;