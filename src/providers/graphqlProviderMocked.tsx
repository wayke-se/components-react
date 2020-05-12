import React from 'react';
import { MockedProvider as ApolloMockedProvider } from '@apollo/react-testing';

import { SEARCH_ITEM_QUERY_MOCKS } from '../queries/SEARCH_ITEM_QUERY';

const mocks = [...SEARCH_ITEM_QUERY_MOCKS];

const MockedProvider = ({ children }: { children: JSX.Element }) => (
  <ApolloMockedProvider mocks={mocks} addTypename={false}>
    {children}
  </ApolloMockedProvider>
);

export default MockedProvider;
