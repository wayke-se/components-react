import React, { useCallback, useState } from 'react';

import Container from '../../components/Container';
import { Page, PageSection } from '../../components/Page';
import Result from '../../components/Result';
import Filter from '../../components/Filter';
import Grid from '../../components/Grid';
import SearchTerm from '../../components/SearchTerm';
import InputSearch from '../../components/InputSearch';
import Breadcrumbs from '../../components/Breadcrumbs';
import { PortalNamespace } from '../../components/Portal';
import PortalElement from '../../components/Portal/portal-element';
import Repeat from '../../components/Repeat';
import useSearchList, { QueryFilter } from '../../hooks/useSearchList';

interface DefaultSearchLayoutProps {
  url: string;
  apiKey: string;
  onClickSearchItem?: (id: string) => void;
}

const DefaultSearchLayout = ({ onClickSearchItem, url, apiKey }: DefaultSearchLayoutProps) => {
  const [query, setQuery] = useState<QueryFilter>();
  const { loading, response, documents, initialFacets } = useSearchList(url, apiKey, query);

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

  return (
    <>
      <Page>
        <PageSection large>
          <Container>
            <Repeat small>
              <InputSearch placeholder="Sök" label="Sök" id="main-search" />
            </Repeat>
            <Repeat small>
              <Breadcrumbs
                items={[
                  {
                    title: 'Bilar',
                    href: '#',
                  },
                  {
                    title: 'Sökresultat "elbil"',
                  },
                ]}
              />
            </Repeat>
          </Container>
        </PageSection>
        <PageSection large>
          <Container>
            <SearchTerm>elbil</SearchTerm>
          </Container>
        </PageSection>
        <PageSection>
          <Container>
            <Filter
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
              onLoadMore={onLoadMore}
              numberOfDocuments={documents?.length || 0}
              numberOfHits={response?.documentList.numberOfHits || 0}
            >
              <Grid onClickItem={onClickSearchItem} documents={documents} />
            </Result>
          </Container>
        </PageSection>
      </Page>
      <PortalElement id={PortalNamespace.DefaultPortal} />
    </>
  );
};

export default DefaultSearchLayout;
