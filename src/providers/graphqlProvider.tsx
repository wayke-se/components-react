import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { ApolloProvider as ApolloProviderBase } from '@apollo/client/react';
import React from 'react';

const GraphqlProvider = ({ uri, children }: { uri: string; children: React.ReactNode }) => {
  const client = new ApolloClient({
    link: new HttpLink({ uri }),
    cache: new InMemoryCache(),
  });
  return <ApolloProviderBase client={client}>{children}</ApolloProviderBase>;
};

export default GraphqlProvider;
