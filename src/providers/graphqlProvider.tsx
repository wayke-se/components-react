import React from 'react';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { ApolloProvider as ApolloProviderBase } from '@apollo/client/react';

const GraphqlProvider = ({ uri, children }: { uri: string; children: React.ReactNode }) => {
  const client = new ApolloClient({
    link: new HttpLink({ uri }),
    cache: new InMemoryCache(),
  });
  return <ApolloProviderBase client={client}>{children}</ApolloProviderBase>;
};

export default GraphqlProvider;
