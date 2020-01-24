import React from "react";
import {useParams} from "react-router-dom";
import ScreenArea from "./ScreenArea";
import PageTitle from "../lib/PageTitle";
import Words from "../lib/Words";

const ApiScreen: React.FC = () => {
    let {name} = useParams();

    return (
        <ScreenArea>
            <PageTitle>
                {name}
            </PageTitle>

            <Words>
                this area will be replaced with a container that renders api spec
            </Words>
        </ScreenArea>
    );
};

export default ApiScreen;