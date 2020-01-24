import React from "react";
import ApiEntry from "../../model/ApiEntry";
import Words from "./Words";
import {Card, CardTitle} from "./Card";
import Linkable from "./Linkable";
import {useRouteMatch} from "react-router-dom";

type CardProps = {
    apiEntry: ApiEntry;
    fadeInSeconds?: number;
}

const ApiCard: React.FC<CardProps> = ({apiEntry, fadeInSeconds = 0}) => {
    let {url} = useRouteMatch();

    return (
        <Linkable to={`${url}/${apiEntry.name}`}>
            <Card clickable fadeInFor={fadeInSeconds}>
                <CardTitle>
                    {
                        apiEntry.displayName
                    }
                </CardTitle>
                <Words>
                    {
                        apiEntry.description
                    }
                </Words>
            </Card>
        </Linkable>
    );
};

export default ApiCard;

