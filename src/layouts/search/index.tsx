import React, { useEffect } from 'react';

import Container from '../../components/Container';
import { Page, PageSection } from '../../components/Page';
import Result from '../../components/Result';
import Filter from '../../components/Filter';
import Grid from '../../components/Grid';
import SearchTerm from '../../components/SearchTerm';
import { PortalNamespace } from '../../components/Portal';
import PortalElement from '../../components/Portal/portal-element';
import Repeat from '../../components/Repeat';
import SearchFilter from '../../components/SearchFilter';
import Snackbar from '../../components/Snackbar';
import useSearch from '../../hooks/useSearch';
import { SearchFilterTypes } from '../../@types/filter';

interface DefaultSearchLayoutProps {
  filterList?: SearchFilterTypes[];
  initialQueryParams?: URLSearchParams;
  onClickSearchItem?: (id: string) => void;
}

const DefaultSearchLayout = ({
  filterList,
  initialQueryParams,
  onClickSearchItem,
}: DefaultSearchLayoutProps) => {
  const { error, documents, queryFilter, onInitialize } = useSearch();

  useEffect(() => {
    onInitialize(initialQueryParams);
  }, []);

  const searchQuery = queryFilter.searchParams.get('query');

  return (
    <>
      <Page>
        <PageSection large>
          <Container>
            <Repeat small>
              <SearchFilter />
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
            <Filter filterList={filterList} />
          </Container>
        </PageSection>
        <PageSection accent fillSpace>
          <Container>
            <Result>
              <>
                {error && <Snackbar severity="error" heading="Ett fel uppstod." />}
                {!error && documents && documents.length > 0 && (
                  <Grid onClickItem={onClickSearchItem} documents={documents} />
                )}
                {!error && documents && documents.length === 0 && (
                  <Snackbar severity="warning" heading="Inga resultat" />
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

export default DefaultSearchLayout;
