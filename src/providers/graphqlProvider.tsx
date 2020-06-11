import React from 'react';
import GraphqlProviderMocked from './graphqlProviderMocked';
import { ApolloProvider as ApolloProviderBase } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

const GraphqlProvider = ({
  uri,
  useMock,
  children,
}: {
  uri: string;
  useMock?: boolean;
  children: JSX.Element;
}) => {
  const client = new ApolloClient({ uri });
  if (useMock) {
    return <GraphqlProviderMocked>{children}</GraphqlProviderMocked>;
  }

  return <ApolloProviderBase client={client}>{children}</ApolloProviderBase>;
};

export default GraphqlProvider;
