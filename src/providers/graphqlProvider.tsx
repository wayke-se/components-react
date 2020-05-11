import React from 'react';
import GraphqlProviderMocked from './graphqlProviderMocked';
import { ApolloProvider as ApolloProviderBase } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

const client = new ApolloClient({ uri: 'https://nx9zvp49q7.lp.gql.zone/graphql' });

const GraphqlProvider = ({ useMock, children }: { useMock?: boolean; children: JSX.Element }) => {
  if (useMock) {
    return <GraphqlProviderMocked>{children}</GraphqlProviderMocked>;
  }

  return <ApolloProviderBase client={client}>children{}</ApolloProviderBase>;
};

export default GraphqlProvider;
