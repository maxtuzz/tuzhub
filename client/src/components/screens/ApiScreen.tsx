import React from "react";
import ScreenArea from "./ScreenArea";
import Words from "../lib/Words";
import ApiInfoContainer from "../../containers/ApiInfoContainer";
import {useParams} from "react-router-dom";
import SpecContainer from "../../containers/SpecContainer";
import FadeInContent from "../lib/FadeInContent";

const ApiScreen: React.FC = () => {
    let {name} = useParams();

    if (!name) {
        return <Words>No api name provided</Words>
    }

    return (
        <ScreenArea>
            <FadeInContent>
                <ApiInfoContainer apiName={name}/>
                <SpecContainer/>
            </FadeInContent>
        </ScreenArea>
    );
};

export default ApiScreen;