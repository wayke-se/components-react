import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

import BaseLayout from '../../../src';

const NotFound = lazy(() => import('./NotFound/index'));

const initialQueryParams = new URLSearchParams();
initialQueryParams.set('query', 't roc');

const Routes = () => (
  <Suspense fallback="Loading...">
    <Switch>
      <Route
        path="/"
        exact
        component={(props: any) => (
          <BaseLayout {...props} initialQueryParams={initialQueryParams} />
        )}
      />
      <Route component={NotFound} />
    </Switch>
  </Suspense>
);

export default Routes;
