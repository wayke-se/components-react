import React, { useEffect, useCallback } from 'react';

import Container from '../../components/Container/index';
import { Page, PageSection } from '../../components/Page/index';
import Result from '../../components/Result/index';
import Filter from '../../components/Filter/index';
import Grid from '../../components/Grid/index';
import SearchTerm from '../../components/SearchTerm/index';
import { PortalNamespace } from '../../components/Portal/index';
import PortalElement from '../../components/Portal/portal-element';
import SearchFilter from '../../components/SearchFilter/index';
import Snackbar from '../../components/Snackbar/index';
import useSearch from '../../hooks/useSearch';
import { SearchFilterTypes } from '../../@types/filter';
import PubSub from '../../utils/pubsub/pubsub';

interface WaykeSearchSettings {
  filterList?: SearchFilterTypes[];
  initialQueryParams?: URLSearchParams;
}

type WaykeSearchProps = WaykeSearchSettings & {
  hashRoute?: boolean;
  onClickSearchItem?: (id: string) => void;
};

const WaykeSearch = ({
  filterList,
  initialQueryParams,
  hashRoute,
  onClickSearchItem,
}: WaykeSearchProps) => {
  const { error, documents, queryFilter, onInitialize } = useSearch();

  useEffect(() => {
    onInitialize(initialQueryParams);
  }, []);

  const onItemClicked = useCallback((id: string) => {
    PubSub.publish('ItemClicked', id);
    if (onClickSearchItem) {
      onClickSearchItem(id);
    }
  }, []);

  const searchQuery = queryFilter.searchParams.get('query');

  return (
    <>
      <Page>
        <PageSection>
          <Container>
            <SearchFilter />
          </Container>
        </PageSection>
        {searchQuery && (
          <PageSection>
            <Container>
              <SearchTerm>{searchQuery}</SearchTerm>
            </Container>
          </PageSection>
        )}
        <PageSection>
          <Container>
            <Filter filterList={filterList} />
          </Container>
        </PageSection>
        <PageSection accent fillSpace>
          <Container>
            <Result>
              <>
                {error && (
                  <Snackbar severity="error" icon heading="Ett fel har inträffat">
                    Vänligen försök igen.
                  </Snackbar>
                )}
                {!error && documents && documents.length > 0 && (
                  <Grid hashRoute={hashRoute} onClickItem={onItemClicked} documents={documents} />
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
