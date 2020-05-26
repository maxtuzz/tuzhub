import ApiEntry from "../model/ApiEntry";
import React, {useEffect, useState} from "react";
import ApiCard from "./lib/ApiCard";
import styled from "styled-components";
import SearchBar from "./lib/SearchBar";
import LoadingSpinner from "./LoaderSpinner";
import {useLocation} from "react-router-dom";

interface Props {
    apiEntries: ApiEntry[],
    isLoading: boolean
}

interface Functions {
    getApis: () => void
    resetSpec: () => void
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

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

/**
 * Renders a list of ApiCards and a search bar that filters the apiEntries
 * @param apiEntries
 * @param isLoading
 * @param getApis
 * @param resetSpec
 * @constructor
 */
const ApiList: React.FC<ApiListProps> = ({apiEntries, isLoading, getApis, resetSpec}) => {
    const query: URLSearchParams = useQuery();
    const [filteredApis, setFilteredApis] = useState(apiEntries);

    const searchQuery = query.get("search");

    // Component mounts
    useEffect(() => {
        resetSpec();
        getApis();
    }, [getApis, resetSpec]);

    // Reset filtered list when we refreshed
    useEffect(() => {
        // Use search query if it has been defined
        if (searchQuery != null) {
            refreshList(searchQuery);
        } else {
            setFilteredApis(apiEntries);
        }
    }, [apiEntries]);

    const refreshList = (searchTerm: string) => {
        setFilteredApis(
            apiEntries.filter(apiEntry => {
                return apiEntry.displayName.includes(searchTerm)
                    || apiEntry.description.includes(searchTerm)
                    || apiEntry.name.includes(searchTerm);
            })
        );
    }

    const searchInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        refreshList(e.target.value);
    };

    return (
        <Container>
            {!isLoading &&
            <SearchBar defaultText={searchQuery != null ? searchQuery : undefined} onChange={searchInputChanged}
                       autofocus/>}
            {
                isLoading
                    ?
                    <LoadingSpinner/>
                    :
                    <ListContainer>
                        {
                            filteredApis?.map((apiEntry, index) =>
                                <ApiCard
                                    key={index}
                                    apiEntry={apiEntry}
                                    fadeInSeconds={0.1 * (index + 1)}
                                />
                            )
                        }
                    </ListContainer>
            }
        </Container>
    );
};

export default ApiList;