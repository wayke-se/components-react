import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

import BaseLayout, { DefaultSearchLayout } from '../../../src';
import SearchItem from './SearchItem';

const NotFound = lazy(() => import('./NotFound/index'));

const Routes = () => (
  <Suspense fallback="Loading...">
    <Switch>
      <Route
        path="/"
        exact
        component={(props: any) => <BaseLayout {...props} filterList={['modelSeries', 'price']} />}
      />
      <Route path="/search" exact component={DefaultSearchLayout} />
      <Route path="/product-page" exact component={SearchItem} />
      <Route component={NotFound} />
    </Switch>
  </Suspense>
);

export default Routes;
