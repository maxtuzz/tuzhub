import React from "react";
import ApiEntry from "../../model/ApiEntry";
import Words from "./Words";
import {Card, CardTitle} from "./Card";

type CardProps = {
    apiEntry: ApiEntry;
}

const ApiCard: React.FC<CardProps> = ({apiEntry}) => (
    <Card>
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

