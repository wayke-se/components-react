import React, { useState, useCallback } from 'react';

import { List, Item, Action, Label, Indicator, IndicatorValue } from './wrapper';
import { Facet } from '../../@types/search';
import {
  PRICE,
  MILEAGE,
  MODEL_YEAR,
  LEASING_PRICE,
  BUSINESS_LEASING_PRICE,
  ODOMETER_VALUE_AS_KM,
} from '../../utils/constants';
import useSearch from '../../State/Search/useSearch';
import { SearchFilterTypes, SearchFilterNameTypes } from '../../@types/filter';
import FilterPanel from '../FilterPanel';
import { useTranslation } from 'react-i18next';
import { MarketCode } from '../../@types/market';

const isSelected = (f: Facet, searchParams: URLSearchParams) => {
  switch (f.id) {
    case PRICE:
    case MILEAGE:
    case ODOMETER_VALUE_AS_KM:
    case LEASING_PRICE:
    case BUSINESS_LEASING_PRICE:
    case MODEL_YEAR:
      return searchParams.has(`${f.id}.min`) || searchParams.has(`${f.id}.max`) ? 1 : 0;
    default:
      return f.filters.filter((filter) => filter.selected).length;
  }
};

const filterOdometer = (
  id: string,
  marketCode: MarketCode = 'SE',
  filterList?: SearchFilterNameTypes[]
) => {
  if (filterList) return true;

  if (id === 'mileage') {
    return marketCode === 'SE' ? true : false;
  }

  if (id === 'odometerValueAsKm') {
    return marketCode === 'NO' ? true : false;
  }
  return true;
};

interface FilterProps {
  marketCode?: MarketCode;
  filterList?: SearchFilterTypes[];
}

const Filter = ({ marketCode, filterList }: FilterProps) => {
  const { t } = useTranslation();
  const { queryFilter, initialFacets, loading, response, onFilterUpdate } = useSearch();

  const facets = response?.facets;

  const [facet, setFacet] = useState<Facet>();
  const onSelectFacet = useCallback((nextFacet: Facet) => setFacet(nextFacet), []);
  const onClose = useCallback(() => setFacet(undefined), []);

  if (!facets) {
    return null;
  }
  const filterNames = filterList ? filterList.map((x) => x.filterName) : undefined;

  const filteredFacets = facets
    ?.filter((x) => x.id !== 'segment' && filterOdometer(x.id, marketCode, filterNames))
    ?.filter((f) => (filterNames ? filterNames.includes(f.id as SearchFilterNameTypes) : true))
    .sort((a, b) =>
      filterNames
        ? filterNames.indexOf(a.id as SearchFilterNameTypes) -
          filterNames.indexOf(b.id as SearchFilterNameTypes)
        : 0
    )
    .map((x) => {
      const match = filterList?.find((y) => y.filterName === x.id);
      if (match?.displayName) {
        return {
          ...x,
          displayName: match.displayName,
        };
      }
      return {
        ...x,
        displayName: t(`filter.${x.id}`),
      };
    });

  return (
    <>
      {initialFacets && facet && (
        <FilterPanel
          queryFilter={queryFilter}
          filterList={filterList}
          facet={facet}
          loading={loading}
          filteredFacets={filteredFacets}
          numberOfHits={response?.documentList.numberOfHits || 0}
          onFilterUpdate={onFilterUpdate}
          onClose={onClose}
        />
      )}
      <List>
        {filteredFacets
          .filter((x) => x.filters.length)
          .map((f) => {
            const selected = isSelected(f, queryFilter.searchParams);
            return (
              <Item key={f.id}>
                <Action
                  onClick={() => onSelectFacet(f)}
                  title={f.displayName}
                  aria-label={f.displayName}
                  className={
                    selected > 0
                      ? 'wayke__theme wayke__color--primary-bg wayke__font--bold'
                      : 'wayke__theme wayke__font--regular'
                  }
                >
                  <Label>{f.displayName}</Label>
                  {selected > 0 && (
                    <Indicator>
                      <IndicatorValue>{selected}</IndicatorValue>
                    </Indicator>
                  )}
                </Action>
              </Item>
            );
          })}
      </List>
    </>
  );
};

export default Filter;
