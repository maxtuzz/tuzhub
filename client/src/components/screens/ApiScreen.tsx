import React from "react";
import ScreenArea from "./ScreenArea";
import PageTitle from "../lib/PageTitle";
import Words from "../lib/Words";
import ApiListContainer from "../../containers/ApiListContainer";

const ApiScreen: React.FC = () => (
    <ScreenArea>
        <PageTitle>APIs</PageTitle>
        <Words>Discover organisation APIs</Words>

        <ApiListContainer/>
    </ScreenArea>
);

export default ApiScreen;