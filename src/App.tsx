import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from 'react-router-dom';
import styles from './App.module.css';

import AllSchedulePredictionsRenderer from './renderers/AllSchedulePredictionsRenderer';

function App() {
  return (
    <div className={styles.App}>
      <Router>
        <Switch>
          <Route exact path='/'>
            <AllSchedulePredictionsRenderer />
          </Route>
          <Route path='/sp/:schedulePredictionId'>
            <SchedulePredictionDashboardContainerRoute />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

function SchedulePredictionDashboardContainerRoute() {
  let { schedulePredictionId } = useParams();
  return (<div>{schedulePredictionId}</div>);
}

export default App;
