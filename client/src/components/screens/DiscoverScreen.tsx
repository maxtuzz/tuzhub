import React from "react";
import ScreenArea from "./ScreenArea";
import PageTitle from "../lib/PageTitle";
import ApiListContainer from "../../containers/ApiListContainer";
import styled from "styled-components";

const DiscoverScreenArea = styled(ScreenArea)`
  padding-right: 50px;
`;

const DiscoverScreen: React.FC = () => (
    <DiscoverScreenArea>
        <PageTitle>Discover APIs</PageTitle>
        <ApiListContainer/>
    </DiscoverScreenArea>
);

export default DiscoverScreen;