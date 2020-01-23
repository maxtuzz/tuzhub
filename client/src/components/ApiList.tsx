import ApiEntry from "../model/ApiEntry";
import React, {useEffect, useState} from "react";
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
    const [filteredApis, setFilteredApis] = useState(apiEntries);

    // Component mounts
    useEffect(() => {
        getApis()
    }, [getApis]);

    // Reset filtered list when we refreshed
    useEffect(() => {
        setFilteredApis(apiEntries);
    }, [apiEntries]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value;

        setFilteredApis(
            apiEntries.filter(apiEntry => {
                return apiEntry.displayName.includes(searchTerm)
                    || apiEntry.description.includes(searchTerm)
                    || apiEntry.name.includes(searchTerm);
            })
        );
    };

    return (
        <Container>
            <SearchBar onChange={handleChange}/>
            {
                isLoading
                    ?
                    <Words>Loading...</Words>
                    :
                    <ListContainer>
                        {
                            filteredApis.map((apiEntry, index) =>
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