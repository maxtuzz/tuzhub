import React from "react";
import {OpenAPIV3} from "openapi-types";
import HeaderText from "./components/lib/HeaderText";
import SidebarMenuItem, {SidebarMenuItemLabel} from "./components/lib/SidebarMenuItem";
import styled from "styled-components";

const ObjectsContainer = styled.div`
  margin-top: 50px;
`;

interface Props {
    components?: OpenAPIV3.ComponentsObject
}

const ObjectList: React.FC<Props> = ({components}) => {
    if (!components) return <></>;

    return (
        <ObjectsContainer>
            <HeaderText>Objects</HeaderText>

            {
                components.schemas
                && Object.entries(components?.schemas).map(([key]) => (
                    <SidebarMenuItem>
                        <span>&#8226;</span>
                        <SidebarMenuItemLabel>{key}</SidebarMenuItemLabel>
                    </SidebarMenuItem>
                ))
            }
        </ObjectsContainer>
    );
};

export default ObjectList;