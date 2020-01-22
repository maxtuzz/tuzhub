import React from "react";
import ApiEntry from "../../model/ApiEntry";
import Words from "./Words";
import {Card, CardTitle} from "./Card";

type CardProps = {
    apiEntry: ApiEntry;
    fadeInSeconds?: number;
}

const ApiCard: React.FC<CardProps> = ({apiEntry, fadeInSeconds = 0}) => (
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
);

export default ApiCard;

