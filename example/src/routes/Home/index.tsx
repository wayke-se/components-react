import React from 'react';

import WaykeComposite from '../../../../src/index';

const initialQueryParams = new URLSearchParams();
initialQueryParams.set('modelYear.min', '2018');
initialQueryParams.set('price.min', '1000');
initialQueryParams.set('leasingPrice.min', '1000');
initialQueryParams.set('businessLeasingPrice.min', '1000');

const Home = () => (
  <WaykeComposite
    composite={{
      marketCode: 'NO',
      //initialQueryParams,
      removeSearchBar: false,
      removeFilterOptions: false,
      modifyDocumentTitleItem: true,
      modifyDocumentTitleSearch: 'Wayke',
      displayBranchName: true,
    }}
    provider={{
      graphQlUrl: process.env.WAYKE_GRAPH_QL_URL as string,
      url: process.env.WAYKE_SEARCH_URL as string,
      urlMlt: process.env.WAYKE_SEARCH_MLT_URL as string,
      ecomSettings: {
        url: process.env.WAYKE_ECOM_URL as string,
        useBankId: true,
        serviceLogotypeUrl: 'https://cdn.wayke.se/wui/images/ecom/wayke-logo.svg',
      },
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY as string,
      googleMapsMarker: 'https://www.wayke.se/images/map/marker.png',
      useQueryParamsFromUrl: false,
    }}
  />
);

export default Home;
