import React, { useEffect, useCallback, useMemo } from 'react';

import Container from '../../components/Container';
import { Page, PageSection } from '../../components/Page';
import Result from '../../components/Result';
import Filter from '../../components/Filter';
import Grid from '../../components/Grid';
import SearchTerm from '../../components/SearchTerm';
import { PortalElement, PortalNamespace } from '../../components/Portal';
import SearchFilter from '../../components/SearchFilter';
import Snackbar from '../../components/Snackbar';
import useSearch from '../../State/Search/useSearch';
import { SearchFilterTypes } from '../../@types/filter';
import PubSub from '../../utils/pubsub/pubsub';
import { MarketCode } from '../../@types/market';
import useInitializeTranslation from '../../hooks/useInitializeTranslation';
import { i18nScoped } from '../../utils/I18n';
import { OnItemClick } from '../../components/ProductCard';

const DefaultFilterList: SearchFilterTypes[] = [
  {
    filterName: 'manufacturer',
  },
  {
    filterName: 'modelSeries',
  },
  {
    filterName: 'fuelType',
  },
  {
    filterName: 'gearboxType',
  },
  {
    filterName: 'branch',
  },
  {
    filterName: 'color',
  },
  {
    filterName: 'environmentClass',
  },
  {
    filterName: 'properties.segment',
  },
  {
    filterName: 'drivingWheel',
  },
  {
    filterName: 'price',
  },
  {
    filterName: 'leasingPrice',
  },
  {
    filterName: 'businessLeasingPrice',
  },
  {
    filterName: 'mileage',
  },
  {
    filterName: 'odometerValueAsKm',
  },
  {
    filterName: 'modelYear',
  },
];

export interface WaykeSearchProps {
  marketCode?: MarketCode;
  filterList?: SearchFilterTypes[];
  initialQueryParams?: URLSearchParams | string;
  removeSearchBar?: boolean;
  removeFilterOptions?: boolean;
  placeholderImage?: string;
  hashRoute?: boolean;
  pathRoute?: string;
  modifyDocumentTitleSearch?: string;
  displayBranchName?: boolean;
  onClickSearchItem?: (data: OnItemClick) => void;
}

const WaykeSearch = ({
  marketCode = 'SE',
  filterList: _filterList,
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
  const { error, documents, response, queryFilter, onFilterUpdate, onInitialize } = useSearch();
  const initialized = useInitializeTranslation(marketCode);

  const filterList = useMemo(() => {
    if (_filterList) return _filterList;

    const f = [...DefaultFilterList];
    if (!marketCode || marketCode === 'SE') {
      return f.filter((x) => x.filterName !== 'odometerValueAsKm');
    } else if (marketCode === 'NO') {
      return f.filter((x) => x.filterName !== 'mileage');
    }
    return f;
  }, [_filterList, marketCode]);

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

  useEffect(() => {
    const nextQuery = new URLSearchParams(queryFilter.searchParams);
    PubSub.publish('SearchInitiated', {
      query: nextQuery.toString(),
    });
  }, [queryFilter]);

  useEffect(() => {
    if (documents) {
      const nextQuery = new URLSearchParams(queryFilter.searchParams);
      PubSub.publish('SearchCompleted', {
        query: nextQuery.toString(),
        hits: documents.length,
        totalHits: response?.stats.totalHits || documents.length,
      });
    }
  }, [documents]);

  const onItemClicked = useCallback((data: OnItemClick) => {
    PubSub.publish('ItemClicked', data);
    if (onClickSearchItem) {
      onClickSearchItem(data);
    }
  }, []);

  const onClearQuery = useCallback(() => {
    const nextQuery = new URLSearchParams(queryFilter.searchParams);
    const query = nextQuery.get('query');
    nextQuery.delete('query');
    PubSub.publish('SearchClearQuery', {
      query,
    });
    onFilterUpdate(nextQuery.toString());
  }, [queryFilter.searchParams]);

  const searchQuery = useMemo(() => queryFilter.searchParams.get('query'), [documents]);

  if (!initialized) return null;

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
              <Filter filterList={filterList} marketCode={marketCode} />
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
