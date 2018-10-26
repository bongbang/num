import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import Report from './containers/Report';
import NotFound from './containers/NotFound';

export default () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/report" exact component={Report} />

    {/* Finally, catch all unmatched routes */}
    <Route component={NotFound} />
  </Switch>
);
