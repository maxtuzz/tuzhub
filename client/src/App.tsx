import React from 'react';
import './App.css';
import styled from "styled-components";
import Sidebar from "./components/Sidebar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/free-solid-svg-icons"

const Parent = styled.div`
  display: flex;
  flex-direction: row;
`;

const RoutableContent = styled.div`
  text-align: center;
  width: 100%; 
`;

/**
 * Main app layout
 * @constructor
 */
const App: React.FC = () => (
    <Parent>
        <Sidebar>
            <span>Hello</span>
        </Sidebar>

        <RoutableContent>
            <header className="App-header">
                <p>
                    {"{ Routable content area }"}
                </p>
                <FontAwesomeIcon icon={Icons.faCopyright} />
            </header>
        </RoutableContent>
    </Parent>
);

export default App;
