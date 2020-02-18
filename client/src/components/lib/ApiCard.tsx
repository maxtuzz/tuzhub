import React from "react";
import ApiEntry from "../../model/ApiEntry";
import Words from "./Words";
import {Card, CardTitle} from "./Card";
import Linkable from "./Linkable";
import {useRouteMatch} from "react-router-dom";
import styled from "styled-components";

type CardProps = {
    apiEntry: ApiEntry;
    fadeInSeconds?: number;
}

const CardContent = styled(Words)`
    @media (max-width: 1126px) {
      display: none;
    }
`;

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
                <CardContent>
                    {
                        apiEntry.description
                    }
                </CardContent>
            </Card>
        </Linkable>
    );
};

export default ApiCard;

