import React, { useCallback, useEffect } from 'react';
import { SearchFilterTypes } from '../../@types/filter';
import Container from '../../components/Container';
import Filter from '../../components/Filter';
import Grid from '../../components/Grid';
import { Page, PageSection } from '../../components/Page';
import { PortalElement, PortalNamespace } from '../../components/Portal';
import Result from '../../components/Result';
import SearchFilter from '../../components/SearchFilter';
import SearchTerm from '../../components/SearchTerm';
import Snackbar from '../../components/Snackbar';
import { FREE_TEXT } from '../../Gql/searchParams';
import useSearch from '../../State/Search/useSearch';
import { i18nScoped } from '../../utils/I18n';
import PubSub from '../../utils/pubsub/pubsub';

export interface WaykeSearchProps {
  /** The filters to show, in this order. By default all filters. */
  filterList?: SearchFilterTypes[];
  /** Filters applied when the search loads. */
  initialQueryParams?: URLSearchParams | string;
  removeSearchBar?: boolean;
  removeFilterOptions?: boolean;
  /** Url to an image for vehicles without images. */
  placeholderImage?: string;
  /** Sets the page title. */
  modifyDocumentTitleSearch?: string;
  /** Shows the branch name on the vehicles. */
  displayBranchName?: boolean;
}

const WaykeSearch = ({
  filterList,
  initialQueryParams,
  removeSearchBar,
  placeholderImage,
  removeFilterOptions,
  modifyDocumentTitleSearch,
  displayBranchName,
}: WaykeSearchProps) => {
  const { error, result, params, update, initialize } = useSearch();
  const query = params.toString();

  useEffect(() => {
    if (modifyDocumentTitleSearch) {
      document.title = modifyDocumentTitleSearch;
    }
    initialize(
      typeof initialQueryParams === 'string'
        ? new URLSearchParams(initialQueryParams)
        : initialQueryParams
    );
    PubSub.publish('View', { type: 'search' });
  }, []);

  useEffect(() => {
    PubSub.publish('SearchInitiated', { query });
  }, [query]);

  useEffect(() => {
    if (result) {
      PubSub.publish('SearchCompleted', {
        query,
        hits: result.hits.length,
        totalHits: result.found,
      });
    }
  }, [result]);

  const onClearQuery = useCallback(() => {
    const next = new URLSearchParams(params);
    PubSub.publish('SearchClearQuery', { query: next.get(FREE_TEXT) });
    next.delete(FREE_TEXT);
    update(next);
  }, [params, update]);

  const searchQuery = params.get(FREE_TEXT);

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
                {!error && result && result.hits.length > 0 && (
                  <Grid
                    hits={result.hits}
                    placeholderImage={placeholderImage}
                    displayBranchName={displayBranchName}
                  />
                )}
                {!error && result && result.hits.length === 0 && (
                  <Snackbar
                    severity="warning"
                    icon
                    heading={i18nScoped.t('search.snackbarNoSearchResults.heading') || undefined}
                  >
                    {i18nScoped.t('search.snackbarNoSearchResults.body')}
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
