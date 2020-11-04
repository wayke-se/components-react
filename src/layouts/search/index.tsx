import React, { useEffect, useCallback, useMemo } from 'react';

import Container from '../../components/Container/index';
import { Page, PageSection } from '../../components/Page/index';
import Result from '../../components/Result/index';
import Filter from '../../components/Filter/index';
import Grid from '../../components/Grid/index';
import SearchTerm from '../../components/SearchTerm/index';
import { PortalElement, PortalNamespace } from '../../components/Portal/index';
import SearchFilter from '../../components/SearchFilter/index';
import Snackbar from '../../components/Snackbar/index';
import useSearch from '../../hooks/useSearch';
import { SearchFilterTypes } from '../../@types/filter';
import PubSub from '../../utils/pubsub/pubsub';

export interface WaykeSearchSettings {
  filterList?: SearchFilterTypes[];
  initialQueryParams?: URLSearchParams | string;
  removeSearchBar?: boolean;
  placeholderImage?: string;
}

export type WaykeSearchProps = WaykeSearchSettings & {
  hashRoute?: boolean;
  pathRoute?: boolean;
  onClickSearchItem?: (id: string) => void;
};

const WaykeSearch = ({
  filterList,
  initialQueryParams,
  hashRoute,
  pathRoute,
  removeSearchBar,
  placeholderImage,
  onClickSearchItem,
}: WaykeSearchProps) => {
  const { error, documents, queryFilter, onFilterUpdate, onInitialize } = useSearch();

  useEffect(() => {
    onInitialize(
      typeof initialQueryParams === 'string'
        ? new URLSearchParams(initialQueryParams)
        : initialQueryParams
    );
  }, []);

  const onItemClicked = useCallback((id: string) => {
    PubSub.publish('ItemClicked', id);
    if (onClickSearchItem) {
      onClickSearchItem(id);
    }
  }, []);

  const onClearQuery = useCallback(() => {
    const nextQuery = new URLSearchParams(queryFilter.searchParams);
    nextQuery.delete('q');
    onFilterUpdate(nextQuery.toString());
  }, [queryFilter.searchParams]);

  const searchQuery = useMemo(() => queryFilter.searchParams.get('q'), [documents]);

  return (
    <>
      <Page>
        {!removeSearchBar && (
          <PageSection>
            <Container>
              <SearchFilter />
            </Container>
          </PageSection>
        )}
        {searchQuery && (
          <PageSection>
            <Container>
              <SearchTerm onClear={onClearQuery}>{searchQuery}</SearchTerm>
            </Container>
          </PageSection>
        )}
        <PageSection>
          <Container>
            <Filter filterList={filterList} />
          </Container>
        </PageSection>
        <PageSection accent fillSpace className="wayke__theme wayke__color--accent-bg">
          <Container>
            <Result>
              <>
                {error && (
                  <Snackbar severity="error" icon heading="Ett fel har inträffat">
                    Vänligen försök igen.
                  </Snackbar>
                )}
                {!error && documents && documents.length > 0 && (
                  <Grid
                    hashRoute={hashRoute}
                    pathRoute={pathRoute}
                    onClickItem={onItemClicked}
                    documents={documents}
                    placeholderImage={placeholderImage}
                  />
                )}
                {!error && documents && documents.length === 0 && (
                  <Snackbar severity="warning" icon heading="Inga resultat">
                    Det finns inga resultat som matchar din sökning.
                  </Snackbar>
                )}
              </>
            </Result>
          </Container>
        </PageSection>
      </Page>
      <PortalElement id={PortalNamespace.DefaultPortal} />
    </>
  );
};

export default WaykeSearch;
