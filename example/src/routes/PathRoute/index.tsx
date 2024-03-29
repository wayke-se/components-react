import React from 'react';

import WaykeComposite from '../../../../src';

const initialQueryParams = new URLSearchParams();
initialQueryParams.set('modelYear.min', '2018');

const PathRoute = () => (
  <WaykeComposite
    composite={{
      // initialQueryParams,
      removeSearchBar: false,
      pathRoute: 'https://www.wayke.se/objekt',
      modifyDocumentTitleItem: true,
      modifyDocumentTitleSearch: 'Wayke',
      //initialQueryParams: 'modelSeries=A5&modelSeries=A3',
      marketCode: 'NO',
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
      useQueryParamsFromUrl: true,
      //pathRoute: '/begagnade-bilar/saljes',
    }}
  />
);

export default PathRoute;
