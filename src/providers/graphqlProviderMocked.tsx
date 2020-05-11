import React from 'react';
import { MockedProvider as ApolloMockedProvider } from '@apollo/react-testing';

import { VEHICLE_QUERY_MOCKS } from '../queries/VEHICLE_QUERY';

const mocks = [...VEHICLE_QUERY_MOCKS];

const MockedProvider = ({ children }: { children: JSX.Element }) => (
  <ApolloMockedProvider mocks={mocks} addTypename={false}>
    {children}
  </ApolloMockedProvider>
);

export default MockedProvider;
