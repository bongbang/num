import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AppliedRoute from './components/AppliedRoute';

import Home from './containers/Home';
// import Report from './containers/Report';
import Quiz from './routes/Quiz';
import NotFound from './containers/NotFound';
import Report2 from './routes/Report/mock';

export default ({ childProps }) => (
  <Switch>
    <Route path="/" exact component={Home} />

    <AppliedRoute path="/quiz/:id" exact component={Quiz} props={childProps} />
    <Route path="/report2" exact component={Report2} />

    {/* Finally, catch all unmatched routes */}
    <Route component={NotFound} />
  </Switch>
);
