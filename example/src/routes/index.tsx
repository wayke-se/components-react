import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import WaykeCombinedPage, { WaykeProductPage, WaykeSearchPage } from '../../../src';

const NotFound = lazy(() => import('./NotFound/index'));

const Routes = () => (
  <Suspense fallback="Loading...">
    <Switch>
      <Route path="/" exact component={WaykeCombinedPage} />
      <Route path="/search" exact component={WaykeSearchPage} />
      <Route path="/product-page" exact component={WaykeProductPage} />
      <Route component={NotFound} />
    </Switch>
  </Suspense>
);

export default Routes;
