import React, { useCallback } from 'react';

import { WaykeProvider, WaykeSearch } from '../../../../src/index';

const Search = () => {
  const onClickSearchItem = useCallback((id: string) => {
    // eslint-disable-next-line
    console.log(id);
  }, []);

  return (
    <WaykeProvider
      graphQlUrl={process.env.WAYKE_GRAPH_QL_URL as string}
      url={process.env.WAYKE_SEARCH_URL as string}
      apiKey={process.env.WAYKE_SEARCH_X_API_KEY as string}
      ecomSettings={{
        url: process.env.WAYKE_ECOM_URL as string,
        useBankId: true,
      }}
      googleMapsApiKey={process.env.GOOGLE_MAPS_API_KEY as string}
    >
      <WaykeSearch onClickSearchItem={onClickSearchItem} />
    </WaykeProvider>
  );
};

export default Search;
