import React from "react";
import ScreenArea from "./ScreenArea";
import PageTitle from "../lib/PageTitle";
import Text from "../lib/Text";

const ApiScreen: React.FC = () => (
    <ScreenArea>
        <PageTitle>APIs</PageTitle>
        <Text>Search for APIs </Text>
    </ScreenArea>
);

export default ApiScreen;