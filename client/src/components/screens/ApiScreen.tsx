import React from "react";
import ScreenArea from "./ScreenArea";
import Words from "../lib/Words";
import ApiInfoContainer from "../../containers/ApiInfoContainer";
import {useParams} from "react-router-dom";
import SpecContainer from "../../containers/SpecContainer";
import FadeInDiv from "../lib/FadeInDiv";

const ApiScreen: React.FC = () => {
    let {name} = useParams();

    if (!name) {
        return <Words>No api name provided</Words>
    }

    return (
        <ScreenArea>
            <FadeInDiv>
                <ApiInfoContainer apiName={name}/>
                <SpecContainer/>
            </FadeInDiv>
        </ScreenArea>
    );
};

export default ApiScreen;