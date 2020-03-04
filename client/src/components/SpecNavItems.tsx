import React, {useEffect, useState} from "react";
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

interface Functions {
    scrollTo: (path: string) => void
}

const SpecNavItems: React.FC<Props & Functions> = ({apiDoc, scrollTo}) => {
    const [resourcesOpen, setResourcesOpen] = useState(true);
    const [objectsOpen, setObjectsOpen] = useState(false);

    // When api doc changes, reset nav state
    useEffect(() => {
        setResourcesOpen(true);
        setObjectsOpen(false);
    }, [apiDoc]);

    const resources = apiDoc?.paths && ResourceFormatter.getPaths(apiDoc?.paths).map(path =>
        <SidebarMenuItem onClick={() => scrollTo(path)}>
            <span>&#8226;</span>
            <SidebarMenuItemLabel>{path}</SidebarMenuItemLabel>
        </SidebarMenuItem>
    );

    const objectSchemas = apiDoc?.components?.schemas
        && Object.entries(apiDoc?.components?.schemas).map(([key]) => (
            <SidebarMenuItem onClick={() => scrollTo(key)}>
                <span>&#8226;</span>
                <SidebarMenuItemLabel>{key}</SidebarMenuItemLabel>
            </SidebarMenuItem>
        ));

    const resourcesSectionClicked = () => {
        if (!resourcesOpen) {
            scrollTo("resources");
            setObjectsOpen(false);
        }
        setResourcesOpen(!resourcesOpen);
    };

    const objectSectionClicked = () => {
        if (!objectsOpen) {
            scrollTo("objects");
            setResourcesOpen(false);
        }
        setObjectsOpen(!objectsOpen);
    };

    return (
        <NavItemsContainer out={!apiDoc}>
            <SidebarMenuItem onClick={resourcesSectionClicked}>
                <Chevron open={resourcesOpen}/>
                <SidebarMenuItemLabel>Resources</SidebarMenuItemLabel>
            </SidebarMenuItem>
            <ExpandableContent open={resourcesOpen}>
                {
                    resources
                }
            </ExpandableContent>

            <SidebarMenuItem onClick={objectSectionClicked}>
                <Chevron open={objectsOpen}/>
                <SidebarMenuItemLabel>Objects</SidebarMenuItemLabel>
            </SidebarMenuItem>
            <ExpandableContent open={objectsOpen}>
                {
                    objectSchemas
                }
            </ExpandableContent>
        </NavItemsContainer>
    );
};

export default SpecNavItems;