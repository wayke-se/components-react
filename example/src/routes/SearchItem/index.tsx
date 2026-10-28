import React from 'react';
import { useParams } from 'react-router-dom';

import { WaykeProvider, WaykeSearchItem } from '../../../../src';
import { providerSettings } from '../../settings';

const SearchItem = () => {
  const { id } = useParams();
  if (!id) {
    return <p>No id</p>;
  }
  return (
    <WaykeProvider {...providerSettings} routing={{ mode: 'path', basePath: '/search-item' }}>
      <WaykeSearchItem id={id} />
    </WaykeProvider>
  );
};

export default SearchItem;
