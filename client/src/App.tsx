import React, {useEffect} from 'react';
import styled, {ThemeProvider} from "styled-components";
import Sidebar from "./components/Sidebar";
import HomeScreen from "./components/screens/HomeScreen";
import {Route, Switch, useLocation} from "react-router-dom";
import ConfigureScreen from "./components/screens/ConfigureScreen";
import DiscoverScreen from "./components/screens/DiscoverScreen";
import ApiScreen from "./components/screens/ApiScreen";
import MetricsScreen from "./components/screens/MetricsScreen";
import LinkApiScreen from "./components/screens/LinkApiScreen";
import NotificationsContainer from "./containers/NotificationsContainer";
import theme from "./styling/theme";

const Parent = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: 72px 1fr;
  grid-template-areas:
  //"sidebar head head head"
  "sidebar main main main"
  "sidebar main main main"
  "sidebar main main main";
   
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
 * Todo: Create HoC for Route that includes ScrollToTop component
 * @constructor
 */
const ScrollToTop = () => {
    let {pathname} = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

/**
 * Main app layout
 * @constructor
 */
const App: React.FC = () => (
    <Parent>
        <ThemeProvider theme={theme}>
            <NotificationsContainer/>
            <GriddedSidebar/>

            <RoutableContent>
                <Switch>
                    <Route path="/config">
                        <ScrollToTop/>
                        <ConfigureScreen/>
                    </Route>
                    <Route path="/apis/new">
                        <ScrollToTop/>
                        <LinkApiScreen/>
                    </Route>
                    <Route path="/apis/:name">
                        <ScrollToTop/>
                        <ApiScreen/>
                    </Route>
                    <Route path="/apis">
                        <ScrollToTop/>
                        <DiscoverScreen/>
                    </Route>
                    <Route path="/metrics">
                        <ScrollToTop/>
                        <MetricsScreen/>
                    </Route>
                    <Route path="/">
                        <ScrollToTop/>
                        <HomeScreen/>
                    </Route>
                </Switch>
            </RoutableContent>
        </ThemeProvider>
    </Parent>
);

export default App;
