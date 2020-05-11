import React from 'react';

import Routes from './routes/index';
import { BrowserRouter } from 'react-router-dom';
import { WaykeProvider } from '../../src';

const App = () => {
  return (
    <WaykeProvider useMock>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </WaykeProvider>
  );
};

export default App;
