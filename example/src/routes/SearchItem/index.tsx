import React from 'react';
import { useParams } from 'react-router-dom';

import { WaykeItemProvider, WaykeSearchItem } from '../../../../src';

const SearchItem = () => {
  const { id } = useParams();
  if (!id) {
    return <p>No id</p>;
  }
  return (
    <WaykeItemProvider
      graphQlUrl={process.env.WAYKE_GRAPH_QL_URL as string}
      url={process.env.WAYKE_SEARCH_URL as string}
      urlMlt={process.env.WAYKE_SEARCH_MLT_URL as string}
      ecomSettings={{
        url: process.env.WAYKE_ECOM_URL as string,
        serviceLogotypeUrl: '/images/wayke-logo.svg',
      }}
      googleMapsApiKey={process.env.GOOGLE_MAPS_API_KEY as string}
    >
      <WaykeSearchItem
        id={id}
        marketCode="SE"
        onClickSearchItem={(relatedId) => console.log('onClickSearchItem:', relatedId)}
      />
    </WaykeItemProvider>
  );
};

export default SearchItem;
