import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

import Search from './Search';
import Home from './Home';
import SearchItem from './SearchItem';

const NotFound = lazy(() => import('./NotFound/index'));

const Routes = () => (
  <Suspense fallback="Loading...">
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/search" exact component={Search} />
      <Route path="/search-item/:id" exact component={SearchItem} />
      <Route component={NotFound} />
    </Switch>
  </Suspense>
);

export default Routes;
