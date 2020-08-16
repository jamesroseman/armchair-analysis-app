import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from 'react-router-dom';
import styles from './App.module.css';

import PlayerSelectorContainer from './containers/PlayerSelectorContainer';
import PlayerDashboardRenderer from './renderers/PlayerDashboardRenderer';

function App() {
  return (
    <div className={styles.App}>
      <Router>
        <Switch>
          <Route exact path='/'>
            <PlayerSelectorContainer />
          </Route>
          <Route path='/p/:playerAbbr'>
            <PlayerDashboardContainerRoute />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

function PlayerDashboardContainerRoute() {
  let { playerAbbr } = useParams();
  return (<PlayerDashboardRenderer playerAbbr={playerAbbr} />);
}

export default App;
