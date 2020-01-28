import React from "react";
import ScreenArea from "./ScreenArea";
import Words from "../lib/Words";
import ApiInfoContainer from "../../containers/ApiInfoContainer";
import {useParams} from "react-router-dom";

const ApiScreen: React.FC = () => {
    let {name} = useParams();

    if (!name) {
        return <Words>No api name provided</Words>
    }

    return (
        <ScreenArea>
            <ApiInfoContainer apiName={name}/>
        </ScreenArea>
    );
};

export default ApiScreen;