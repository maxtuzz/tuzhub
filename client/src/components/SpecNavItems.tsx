import React, {useEffect, useState} from "react";
import SidebarMenuItem, {SidebarMenuItemLabel} from "./lib/SidebarMenuItem";
import styled from "styled-components";
import {fadeInTop} from "../styling/anims";
import ExpandableContent from "./lib/ExpandableContent";
import Chevron from "./lib/Chevron";
import {OpenAPIV3} from "openapi-types";
import ResourceFormatter from "../util/ResourceFormatter";
import Spinner from "./Spinner";

const NavItemsContainer = styled.div<{ out?: boolean }>`
  width: 100%;
  animation: ${fadeInTop} 250ms linear;
  
  @media (max-width: 1126px) {
      display: none;
  }
`;

interface Props {
    apiDoc?: OpenAPIV3.Document
    specLoading: boolean
}

interface Functions {
    scrollTo: (path: string) => void
}

const SpecNavItems: React.FC<Props & Functions> = ({apiDoc, specLoading, scrollTo}) => {
    const [resourcesOpen, setResourcesOpen] = useState(true);
    const [objectsOpen, setObjectsOpen] = useState(false);

    // When api doc changes, reset nav state
    useEffect(() => {
        setResourcesOpen(true);
        setObjectsOpen(false);
    }, [apiDoc]);

    const resources = apiDoc?.paths && ResourceFormatter.getPaths(apiDoc?.paths).map(path =>
        <SidebarMenuItem onClick={() => scrollTo(path)} key={path}>
            <span>&#8226;</span>
            <SidebarMenuItemLabel>{path}</SidebarMenuItemLabel>
        </SidebarMenuItem>
    );

    const objectSchemas = apiDoc?.components?.schemas
        && Object.entries(apiDoc?.components?.schemas).map(([key]) => (
            <SidebarMenuItem onClick={() => scrollTo(key)} key={key}>
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

    if (!apiDoc) {
        return <></>;
    }

    if (specLoading) {
        return <Spinner/>;
    }

    return (
        <NavItemsContainer>
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