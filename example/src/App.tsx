import React from 'react';

import Routes from './routes/index';
import { BrowserRouter } from 'react-router-dom';
import { WaykeSearchProvider } from '../../src';

const App = () => {
  return (
    <WaykeSearchProvider
      url={process.env.WAYKE_SEARCH_URL as string}
      apiKey={process.env.WAYKE_SEARCH_X_API_KEY as string}
      useMock
    >
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </WaykeSearchProvider>
  );
};

export default App;
