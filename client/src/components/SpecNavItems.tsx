import React, {useEffect, useState} from "react";
import SidebarMenuItem, {SidebarMenuItemLabel} from "./lib/SidebarMenuItem";
import styled from "styled-components";
import {fadeInTop} from "../styling/anims";
import ExpandableContent from "./lib/ExpandableContent";
import Chevron from "./lib/Chevron";
import {OpenAPIV3} from "openapi-types";
import ResourceFormatter from "../util/ResourceFormatter";
import Spinner from "./lib/Spinner";

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
    scrollTo: (path: "objects" | "resources" | "home" | string) => void
}

/**
 * Spec nav items dynamically renders a list of links based on provided api doc resource paths and objects
 * @param apiDoc
 * @param specLoading
 * @param scrollTo
 * @constructor
 */
const SpecNavItems: React.FC<Props & Functions> = ({apiDoc, specLoading, scrollTo}) => {
    // Only used for styling which nav menu item has been selected
    const [activeMenuItem, setActiveMenuItem] = useState<string>("");
    const [homeOpen, setHomeOpen] = useState(true);
    const [resourcesOpen, setResourcesOpen] = useState(true);
    const [objectsOpen, setObjectsOpen] = useState(false);

    // When api doc changes, reset nav state
    useEffect(() => {
        setResourcesOpen(true);
        setObjectsOpen(false);
    }, [apiDoc]);

    const setNav = (navPath: string) => {
        setActiveMenuItem(navPath);
        scrollTo(navPath);
    }

    const resources = apiDoc?.paths && ResourceFormatter.getPaths(apiDoc?.paths).map(path =>
        <SidebarMenuItem onClick={() => setNav(path)} key={path}>
            <span>&#8226;</span>
            <SidebarMenuItemLabel active={activeMenuItem === path}>{path}</SidebarMenuItemLabel>
        </SidebarMenuItem>
    );

    const objectSchemas = apiDoc?.components?.schemas
        && Object.entries(apiDoc?.components?.schemas).map(([key]) => (
            <SidebarMenuItem onClick={() => setNav(key)} key={key}>
                <span>&#8226;</span>
                <SidebarMenuItemLabel active={activeMenuItem === key}>{key}</SidebarMenuItemLabel>
            </SidebarMenuItem>
        ));

    const homeSectionClick = () => {
        setHomeOpen(!homeOpen);
        setResourcesOpen(false);
        setObjectsOpen(false);

        setNav("home");
    }

    const resourcesSectionClicked = () => {
        if (!resourcesOpen) {
            setNav("resources");
            setObjectsOpen(false);
        }
        setResourcesOpen(!resourcesOpen);
    };

    const objectSectionClicked = () => {
        if (!objectsOpen) {
            setNav("objects");
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

    const title = apiDoc.info.title;
    return (
        <NavItemsContainer>
            <SidebarMenuItem onClick={homeSectionClick}>
                <Chevron open={homeOpen}/>
                <SidebarMenuItemLabel>{title ? title : 'Home'}</SidebarMenuItemLabel>
            </SidebarMenuItem>
            <SidebarMenuItem onClick={resourcesSectionClicked}>
                <Chevron open={resourcesOpen}/>
                <SidebarMenuItemLabel active={activeMenuItem === "resources"}>Resources</SidebarMenuItemLabel>
            </SidebarMenuItem>
            <ExpandableContent open={resourcesOpen}>
                {
                    resources
                }
            </ExpandableContent>

            <SidebarMenuItem onClick={objectSectionClicked}>
                <Chevron open={objectsOpen}/>
                <SidebarMenuItemLabel active={activeMenuItem === "objects"}>Objects</SidebarMenuItemLabel>
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