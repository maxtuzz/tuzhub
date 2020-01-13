import React from 'react';
import './App.css';
import styled from "styled-components";
import logo from './logo.svg';
import Button from "./components/lib/Button";
import Sidebar from "./components/Sidebar";

const Parent = styled.div`
  display: grid;
  grid-template-columns: 0.25fr 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 0;
  grid-row-gap: 0;
`;

const ScrollableMenuStyled = styled.div`
  grid-area: 1 / 1 / 2 / 2;
  background-color: #282c34;
  overflow: auto;
`;

const RoutableContent = styled.div`
  grid-area: 1 / 2 / 2 / 3; 
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
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <p>
                        Tuzzy
                    </p>
                    <Button>Click me</Button>
                </header>
            </div>
        </RoutableContent>
    </Parent>
);

export default App;
