import React, { useEffect } from 'react';
import ApiEntry from '../model/ApiEntry';
import PageTitle from './lib/PageTitle';
import styled from 'styled-components';
import { fadeInBottomCss } from '../styling/anims';
import LoadingSpinner from './LoaderSpinner';
import Markdown from './lib/Markdown';

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const VersionTagContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 35px;
  height: 30px;
  border-radius: 15px;

  padding-left: 10px;
  padding-right: 10px;

  background-color: green;
  font-weight: 600;

  &:hover {
    cursor: pointer;
  }

  ${fadeInBottomCss}
`;

interface Props {
  apiEntry: ApiEntry | undefined;
  specVersion?: string;
  specDescription?: string;
}

interface Functions {
  loadApi: () => void;
}

type ApiInfoProps = Props & Functions;

/**
 * Renders API information including markdown description
 * @param apiEntry
 * @param loadApi
 * @param specVersion
 * @param specDescription
 * @constructor
 */
const ApiInfo: React.FC<ApiInfoProps> = ({ apiEntry, loadApi, specVersion, specDescription }) => {
  useEffect(() => {
    loadApi();
  }, [loadApi]);

  if (!apiEntry) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <HeaderContainer>
        <PageTitle>{apiEntry.displayName}</PageTitle>
        {specVersion && <VersionTagContainer>Spec: {specVersion}</VersionTagContainer>}
      </HeaderContainer>
      {specDescription && <Markdown source={specDescription} />}
    </div>
  );
};

export default ApiInfo;
