import React from "react";
import PageTitle from "../lib/PageTitle";
import ScreenArea from "./ScreenArea";
import Words from "../lib/Words";
import SubHeaderText from "../lib/SubHeaderText";

const ConfigureScreen: React.FC = () => (
    <ScreenArea>
        <PageTitle>
            Configure
        </PageTitle>

        <SubHeaderText>
            Portal settings
        </SubHeaderText>
        <Words>
            Here you can set local client settings such as theme
        </Words>

        <SubHeaderText>
            Server settings
        </SubHeaderText>

        <Words>
            Configure dynamic update period, security, and restrictions
        </Words>
    </ScreenArea>
);

export default ConfigureScreen;