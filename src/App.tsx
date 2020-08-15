import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from 'react-router-dom';
import styles from './App.module.css';

import PlayerDashboardContainer from './containers/PlayerDashboardContainer';
import PlayerSelectorContainer from './containers/PlayerSelectorContainer';

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
  return (<PlayerDashboardContainer playerAbbr={playerAbbr} />);
}

export default App;
