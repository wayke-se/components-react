import React, { useEffect } from 'react';
import useRouter from '../State/Router/useRouter';
import useSettings from '../State/Settings/useSettings';
import PubSub from '../utils/pubsub/pubsub';
import WaykeSearch, { WaykeSearchProps } from './search';
import WaykeSearchItem, { WaykeSearchItemProps } from './searchItem';

export type WaykeCompositeProps = WaykeSearchProps & Omit<WaykeSearchItemProps, 'id'>;

/** The search, switching to the vehicle page when a vehicle is opened. */
const WaykeComposite = ({
  filterList,
  initialQueryParams,
  removeSearchBar,
  removeFilterOptions,
  disableResetScrollOnInit,
  placeholderImage,
  modifyDocumentTitleItem,
  modifyDocumentTitleSearch,
  displayBranchName,
  conversionOptions,
}: WaykeCompositeProps) => {
  const { id } = useRouter();
  const { routing } = useSettings();

  useEffect(() => {
    if (routing.mode === 'hash') {
      PubSub.publish('HashRouteChange', { id });
    }
  }, [id]);

  return id ? (
    <WaykeSearchItem
      key={id}
      id={id}
      disableResetScrollOnInit={disableResetScrollOnInit}
      placeholderImage={placeholderImage}
      modifyDocumentTitleItem={modifyDocumentTitleItem}
      displayBranchName={displayBranchName}
      conversionOptions={conversionOptions}
    />
  ) : (
    <WaykeSearch
      filterList={filterList}
      initialQueryParams={initialQueryParams}
      removeSearchBar={removeSearchBar}
      placeholderImage={placeholderImage}
      removeFilterOptions={removeFilterOptions}
      modifyDocumentTitleSearch={modifyDocumentTitleSearch}
      displayBranchName={displayBranchName}
    />
  );
};

export default WaykeComposite;
