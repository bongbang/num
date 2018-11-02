import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AppliedRoute from './components/AppliedRoute';

import Home from './containers/Home';
import Report from './containers/Report';
import Quiz from './containers/Quiz';
import NotFound from './containers/NotFound';

export default ({ childProps }) => (
  <Switch>
    <Route path="/" exact component={Home} />

    <Route path="/report" exact component={Report} />

    <AppliedRoute path="/quiz/:id" exact component={Quiz} props={childProps} />
    {/* Finally, catch all unmatched routes */}
    <Route component={NotFound} />
  </Switch>
);
