import React from 'react';
import { ApolloProvider as ApolloProviderBase, ApolloClient, InMemoryCache } from '@apollo/client';

const GraphqlProvider = ({ uri, children }: { uri: string; children: React.ReactNode }) => {
  const client = new ApolloClient({ uri, cache: new InMemoryCache() });
  return <ApolloProviderBase client={client}>{children}</ApolloProviderBase>;
};

export default GraphqlProvider;
