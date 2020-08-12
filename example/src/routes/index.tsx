import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import Loader from '../../../src/components/Loader';

const Search = lazy(() => import('./Search'));
const Home = lazy(() => import('./Home'));
const SearchItem = lazy(() => import('./SearchItem'));
const NotFound = lazy(() => import('./NotFound/index'));

const Routes = () => (
  <Suspense fallback={<Loader />}>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/search" exact component={Search} />
      <Route path="/search-item/:id" exact component={SearchItem} />
      <Route component={NotFound} />
    </Switch>
  </Suspense>
);

export default Routes;
