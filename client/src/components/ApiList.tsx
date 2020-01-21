import ApiEntry from "../model/ApiEntry";
import React, {useEffect} from "react";
import ApiCard from "./lib/ApiCard";
import Words from "./lib/Words";

interface Props {
    apiEntries: ApiEntry[],
    isLoading: boolean
}

interface Functions {
    getApis: () => void
}

type ApiListProps = Props & Functions

const ApiList: React.FC<ApiListProps> = ({apiEntries, isLoading, getApis}) => {
    useEffect(() => {
        getApis()
    }, []);

    if (isLoading) {
        return <Words>Loading...</Words>
    }

    return (
        <div>
            {apiEntries.map(apiEntry => <ApiCard apiEntry={apiEntry}/>)}
        </div>
    );
};

export default ApiList;