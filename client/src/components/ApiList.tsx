import ApiEntry from "../model/ApiEntry";
import React, {useEffect} from "react";
import ApiCard from "./lib/ApiCard";
import Words from "./lib/Words";
import styled from "styled-components";
import SearchBar from "./lib/SearchBar";

interface Props {
    apiEntries: ApiEntry[],
    isLoading: boolean
}

interface Functions {
    getApis: () => void
}

type ApiListProps = Props & Functions

const Container = styled.div`
  width: 100%;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const ApiList: React.FC<ApiListProps> = ({apiEntries, isLoading, getApis}) => {
    useEffect(() => {
        getApis()
    }, [getApis]);

    return (
        <Container>
            <SearchBar/>
            {
                isLoading
                    ?
                    <Words>Loading...</Words>
                    :
                    <ListContainer>
                        {
                            apiEntries.map((apiEntry, index) => {
                                return <ApiCard key={index} apiEntry={apiEntry} fadeInSeconds={0.5 * (index + 1)}/>;
                            })
                        }
                    </ListContainer>
            }
        </Container>
    );
};

export default ApiList;