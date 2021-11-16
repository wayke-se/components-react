import React, { Suspense, lazy } from 'react';
import { Route, Routes as ReactRouterDomRoutes } from 'react-router-dom';
import Loader from '../../../src/components/Loader';

const Search = lazy(() => import('./Search'));
const PathRoute = lazy(() => import('./PathRoute'));
const HashRoute = lazy(() => import('./HashRoute'));
const Home = lazy(() => import('./Home'));
const SearchItem = lazy(() => import('./SearchItem'));
const NotFound = lazy(() => import('./NotFound/index'));

const Routes = () => (
  <Suspense fallback={<Loader />}>
    <ReactRouterDomRoutes>
      <Route path="/" element={<Home />} />
      <Route path="/a/b/:id?" element={<PathRoute />} />
      <Route path="/hash" element={<HashRoute />} />
      <Route path="/search" element={<Search />} />
      <Route path="/search-item/:id" element={<SearchItem />} />
      <Route element={<NotFound />} />
    </ReactRouterDomRoutes>
  </Suspense>
);

export default Routes;
