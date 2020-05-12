import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import SEARCH_ITEM_QUERY from '../../queries/SEARCH_ITEM_QUERY';
import { SearchItem } from '../../@types/gql/SearchItem';

const DefaultSerchItemLayout = () => {
  const { loading } = useQuery<SearchItem>(SEARCH_ITEM_QUERY, { variables: { id: 'test' } });
  return <p>DefaultSerchItemLayout {loading ? 'loading...' : false}</p>;
};

export default DefaultSerchItemLayout;
