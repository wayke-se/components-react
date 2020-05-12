import React from 'react';

import Routes from './routes/index';
import { BrowserRouter } from 'react-router-dom';
import { WaykeSearchProvider } from '../../src';

const App = () => {
  return (
    <WaykeSearchProvider useMock>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </WaykeSearchProvider>
  );
};

export default App;
