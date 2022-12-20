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
import useSearch from '../../State/Search/useSearch';
import { SearchFilterTypes } from '../../@types/filter';
import PubSub from '../../utils/pubsub/pubsub';

export interface WaykeSearchProps {
  filterList?: SearchFilterTypes[];
  initialQueryParams?: URLSearchParams | string;
  removeSearchBar?: boolean;
  removeFilterOptions?: boolean;
  placeholderImage?: string;
  hashRoute?: boolean;
  pathRoute?: string;
  modifyDocumentTitleSearch?: string;
  displayBranchName?: boolean;
  onClickSearchItem?: (id: string) => void;
}

const WaykeSearch = ({
  filterList,
  initialQueryParams,
  hashRoute,
  pathRoute,
  removeSearchBar,
  placeholderImage,
  removeFilterOptions,
  modifyDocumentTitleSearch,
  displayBranchName,
  onClickSearchItem,
}: WaykeSearchProps) => {
  const { error, documents, queryFilter, onFilterUpdate, onInitialize } = useSearch();

  useEffect(() => {
    if (modifyDocumentTitleSearch) {
      document.title = modifyDocumentTitleSearch;
    }
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
    nextQuery.delete('query');
    onFilterUpdate(nextQuery.toString());
  }, [queryFilter.searchParams]);

  const searchQuery = useMemo(() => queryFilter.searchParams.get('query'), [documents]);

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
        {!removeFilterOptions && (
          <PageSection>
            <Container>
              <Filter filterList={filterList} />
            </Container>
          </PageSection>
        )}
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
                    displayBranchName={displayBranchName}
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
