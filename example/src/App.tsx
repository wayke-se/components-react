import React from 'react';

import Routes from './routes/index';
import { BrowserRouter } from 'react-router-dom';
import { WaykeProvider } from '../../src';

const App = () => {
  return (
    <WaykeProvider
      graphQlUrl={process.env.WAYKE_GRAPH_QL_URL as string}
      url={process.env.WAYKE_SEARCH_URL as string}
      apiKey={process.env.WAYKE_SEARCH_X_API_KEY as string}
      ecomUrl={process.env.WAYKE_ECOM_URL as string}
    >
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </WaykeProvider>
  );
};

export default App;
