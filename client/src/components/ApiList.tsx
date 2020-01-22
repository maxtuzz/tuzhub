import ApiEntry from "../model/ApiEntry";
import React, {useEffect} from "react";
import ApiCard from "./lib/ApiCard";
import Words from "./lib/Words";
import styled from "styled-components";

interface Props {
    apiEntries: ApiEntry[],
    isLoading: boolean
}

interface Functions {
    getApis: () => void
}

type ApiListProps = Props & Functions

const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
`;

const ApiList: React.FC<ApiListProps> = ({apiEntries, isLoading, getApis}) => {
    useEffect(() => {
        getApis()
    }, [getApis]);

    if (isLoading) {
        return <Words>Loading...</Words>
    }

    return (
        <ListContainer>
            {
                apiEntries.map((apiEntry, index) => {
                    return <ApiCard apiEntry={apiEntry} fadeInSeconds={0.5 * (index + 1)}/>;
                })
            }
        </ListContainer>
    );
};

export default ApiList;