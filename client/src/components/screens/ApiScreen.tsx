import React from "react";
import ScreenArea from "./ScreenArea";
import PageTitle from "../lib/PageTitle";
import ApiListContainer from "../../containers/ApiListContainer";

const ApiScreen: React.FC = () => (
    <ScreenArea>
        <PageTitle>Discover APIs</PageTitle>
        <ApiListContainer/>
    </ScreenArea>
);

export default ApiScreen;