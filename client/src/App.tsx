import React from 'react';
import styled from "styled-components";
import Sidebar from "./components/Sidebar";
import HomeScreen from "./components/screens/HomeScreen";
import {Route, Switch} from "react-router-dom";
import ConfigureScreen from "./components/screens/ConfigureScreen";
import ApiScreen from "./components/screens/ApiScreen";

const Parent = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: 72px 1fr;
  grid-template-areas:
   //"sidebar head head head"
   "sidebar main main main"
   "sidebar main main main"
   "sidebar main main main";

   /* grid-container height = 100% of viewport height */
   height: 100vh;
   
   @media screen and (max-width: 1126px) {
     grid-template-columns: 75px 1fr;
     grid-template-rows: 72px 1fr;
   }
`;

const RoutableContent = styled.div`
  width: 100%; 
  grid-area: main;
`;

const GriddedSidebar = styled(Sidebar)`
  grid-area: sidebar;
`;

/**
 * Main app layout
 * @constructor
 */
const App: React.FC = () => (
    <Parent>
        <GriddedSidebar/>

        <RoutableContent>
            <Switch>
                <Route path="/config">
                    <ConfigureScreen/>
                </Route>
                <Route path="/apis">
                    <ApiScreen/>
                </Route>
                <Route path="/">
                    <HomeScreen/>
                </Route>
            </Switch>
        </RoutableContent>
    </Parent>
);

export default App;
