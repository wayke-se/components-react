import React from 'react';

import { WaykeProvider, WaykeSearchItem } from '../../../../src/index';
import { RouteComponentProps } from 'react-router-dom';

type SearchItemProps = RouteComponentProps<{ id?: string }>;

const SearchItem = ({ match }: SearchItemProps) => {
  const id = match.params.id;
  if (!id) {
    return <p>No id</p>;
  }
  return (
    <WaykeProvider
      graphQlUrl={process.env.WAYKE_GRAPH_QL_URL as string}
      url={process.env.WAYKE_SEARCH_URL as string}
      ecomSettings={{
        url: process.env.WAYKE_ECOM_URL as string,
        useBankId: true,
      }}
      googleMapsApiKey={process.env.GOOGLE_MAPS_API_KEY as string}
    >
      <WaykeSearchItem id={id} />
    </WaykeProvider>
  );
};

export default SearchItem;
