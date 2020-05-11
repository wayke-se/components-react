import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import Combined, { ProductPage, Search } from '../../../src';

const NotFound = lazy(() => import('./NotFound/index'));

const Routes = () => (
  <Suspense fallback="Loading...">
    <Switch>
      <Route path="/" exact component={Combined} />
      <Route path="/search" exact component={Search} />
      <Route path="/product-page" exact component={ProductPage} />
      <Route component={NotFound} />
    </Switch>
  </Suspense>
);

export default Routes;
