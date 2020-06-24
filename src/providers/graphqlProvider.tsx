import React from 'react';
import { ApolloProvider as ApolloProviderBase } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

const GraphqlProvider = ({ uri, children }: { uri: string; children: React.ReactNode }) => {
  const client = new ApolloClient({ uri });
  return <ApolloProviderBase client={client}>{children}</ApolloProviderBase>;
};

export default GraphqlProvider;
