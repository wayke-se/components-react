import React, { useCallback } from 'react';
import DefaultSearchLayout from './search/default';
import { DefaultSearchItemLayout } from '..';
import useHashGuid from '../hooks/useHashGuid';

interface BaseLayoutProps {
  url: string;
  apiKey: string;
}

const BaseLayout = ({ url, apiKey }: BaseLayoutProps) => {
  const id = useHashGuid();
  const onClickSearchItem = useCallback(() => {
    // track id
  }, []);

  return (
    <>
      {id ? (
        <DefaultSearchItemLayout id={id} />
      ) : (
        <DefaultSearchLayout onClickSearchItem={onClickSearchItem} url={url} apiKey={apiKey} />
      )}
    </>
  );
};

export default BaseLayout;
