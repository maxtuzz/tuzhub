import React, {useEffect} from "react";
import ApiEntry from "../model/ApiEntry";
import PageTitle from "./lib/PageTitle";
import Words from "./lib/Words";

interface Props {
    apiEntry: ApiEntry | undefined;
}

interface Functions {
    loadApi: () => void;
}

type ApiInfoProps = Props & Functions;

const ApiInfo: React.FC<ApiInfoProps> = ({apiEntry, loadApi}) => {
    useEffect(() => {
        loadApi();
    }, [loadApi]);

    if (!apiEntry) {
        return <Words>Loading...</Words>
    }

    return (
        <div>
            <PageTitle>{apiEntry.displayName}</PageTitle>
            <Words>{apiEntry.description}</Words>
        </div>
    );
};

export default ApiInfo;