import React from "react";
import PageTitle from "../lib/PageTitle";
import ScreenArea from "./ScreenArea";
import Words from "../lib/Words";

const MetricsScreen: React.FC = () => (
    <ScreenArea>
        <PageTitle>
            Metrics
        </PageTitle>
        <Words>
            This is a placeholder screen where API metrics will be eventually shown in a later build
        </Words>
    </ScreenArea>
);

export default MetricsScreen;