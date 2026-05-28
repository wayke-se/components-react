import React from 'react';
import {
  ApolloProvider as ApolloProviderBase,
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from '@apollo/client';

const GraphqlProvider = ({ uri, children }: { uri: string; children: React.ReactNode }) => {
  const client = new ApolloClient({
    link: new HttpLink({ uri }),
    cache: new InMemoryCache(),
  });
  return <ApolloProviderBase client={client}>{children}</ApolloProviderBase>;
};

export default GraphqlProvider;
