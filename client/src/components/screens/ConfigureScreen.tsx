import React from "react";
import PageTitle from "../lib/PageTitle";
import ScreenArea from "./ScreenArea";
import Words from "../lib/Words";
import SubHeaderText from "../lib/SubHeaderText";
import Modal from "../lib/Modal";

const ConfigureScreen: React.FC = () => (
    <ScreenArea>
        <PageTitle>
            Configure
        </PageTitle>

        <Modal open={true} title={"My title"}>
            <Words>this modal in particular is locked to always show. Move to new page to get rid of it</Words>
        </Modal>

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