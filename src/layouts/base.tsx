import React, { useCallback } from 'react';
import DefaultSearchLayout from './search/default';
import { DefaultSearchItemLayout } from '..';
import useHashGuid from '../hooks/useHashGuid';

const BaseLayout = () => {
  const id = useHashGuid();
  const onClickSearchItem = useCallback(() => {
    // track id
  }, []);

  return (
    <>
      {id ? (
        <DefaultSearchItemLayout id={id} />
      ) : (
        <DefaultSearchLayout onClickSearchItem={onClickSearchItem} />
      )}
    </>
  );
};

export default BaseLayout;
