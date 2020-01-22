import React from "react";
import ScreenArea from "./ScreenArea";
import PageTitle from "../lib/PageTitle";
import ApiListContainer from "../../containers/ApiListContainer";
import styled from "styled-components";

const ApiScreenArea = styled(ScreenArea)`
  padding-right: 50px;
`;

const ApiScreen: React.FC = () => (
    <ApiScreenArea>
        <PageTitle>Discover APIs</PageTitle>
        <ApiListContainer/>
    </ApiScreenArea>
);

export default ApiScreen;