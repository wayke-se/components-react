import React from 'react';

import WaykeComposite from '../../../../src/index';

const initialQueryParams = new URLSearchParams();
initialQueryParams.set('hits', '30');

const Home = () => (
  <WaykeComposite
    provider={{
      graphQlUrl: process.env.WAYKE_GRAPH_QL_URL as string,
      url: process.env.WAYKE_SEARCH_URL as string,
      apiKey: process.env.WAYKE_SEARCH_X_API_KEY as string,
      ecomSettings: {
        url: process.env.WAYKE_ECOM_URL as string,
        useBankId: true,
      },
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY as string,
    }}
    composite={{ initialQueryParams }}
  />
);

export default Home;
