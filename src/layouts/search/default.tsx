import React, { useCallback, useState } from 'react';

import Container from '../../components/Container';
import { Page, PageSection } from '../../components/Page';
import Result from '../../components/Result';
import Filter from '../../components/Filter';
import Grid from '../../components/Grid';
import SearchTerm from '../../components/SearchTerm';
import { PortalNamespace } from '../../components/Portal';
import PortalElement from '../../components/Portal/portal-element';
import Repeat from '../../components/Repeat';
import useSearchList, { QueryFilter } from '../../hooks/useSearchList';
import SearchFilter from '../../components/SearchFilter';
import Snackbar from '../../components/Snackbar';

interface DefaultSearchLayoutProps {
  url: string;
  apiKey: string;
  onClickSearchItem?: (id: string) => void;
}

const DefaultSearchLayout = ({ onClickSearchItem, url, apiKey }: DefaultSearchLayoutProps) => {
  const [query, setQuery] = useState<QueryFilter>();
  const searchParams = new URLSearchParams(query?.query || '');
  const searchQuery = searchParams.get('query');

  const { loading, response, documents, initialFacets, queryFilter } = useSearchList(
    url,
    apiKey,
    query
  );

  const onLoadMore = useCallback(() => {
    if (response) {
      setQuery({ query: response?.documentList.pagination.nextPage?.query, concatResult: true });
    }
  }, [response]);

  const onFilterUpdate = useCallback(
    (nextQuery: string) =>
      setQuery({
        query: nextQuery,
      }),
    []
  );

  const useSkeletons = !!queryFilter?.concatResult;

  return (
    <>
      <Page>
        <PageSection large>
          <Container>
            <Repeat small>
              <SearchFilter searchParams={searchParams} onFilterUpdate={onFilterUpdate} />
            </Repeat>
          </Container>
        </PageSection>
        {searchQuery && (
          <PageSection large>
            <Container>
              <SearchTerm>{searchQuery}</SearchTerm>
            </Container>
          </PageSection>
        )}
        <PageSection>
          <Container>
            <Filter
              loading={loading}
              searchParams={searchParams}
              initialFacets={initialFacets}
              facets={response?.facets}
              numberOfHits={response?.documentList.numberOfHits || 0}
              onFilterUpdate={onFilterUpdate}
            />
          </Container>
        </PageSection>
        <PageSection accent>
          <Container>
            <Result
              loading={loading}
              useSkeletons={useSkeletons}
              onLoadMore={onLoadMore}
              numberOfDocuments={documents?.length || 0}
              numberOfHits={response?.documentList.numberOfHits || 0}
            >
              {documents && documents.length > 0 ? (
                <Grid onClickItem={onClickSearchItem} documents={documents} />
              ) : (
                <Snackbar severity="error" heading="Inga resultat" />
              )}
            </Result>
          </Container>
        </PageSection>
      </Page>
      <PortalElement id={PortalNamespace.DefaultPortal} />
    </>
  );
};

export default DefaultSearchLayout;
