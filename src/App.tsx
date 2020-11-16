import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from 'react-router-dom';
import styles from './App.module.css';

import AllSchedulePredictionsRenderer from './renderers/AllSchedulePredictionsRenderer';
import SchedulePredictionRenderer from './renderers/SchedulePredictionRenderer';

type SchedulePredictionDashboardParams = {
  scheduleId: string,
}

function App() {
  return (
    <div className={styles.App}>
      <Router>
        <Switch>
          <Route exact path='/'>
            <AllSchedulePredictionsRenderer />
          </Route>
          <Route path='/s/:scheduleId'>
            <SchedulePredictionDashboardContainerRoute />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

function SchedulePredictionDashboardContainerRoute() {
  const { scheduleId } = useParams<SchedulePredictionDashboardParams>();
  return <SchedulePredictionRenderer scheduleId={scheduleId} />;
}

export default App;
