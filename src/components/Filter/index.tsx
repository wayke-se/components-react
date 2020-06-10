import React, { useState, useCallback } from 'react';

import { List, Item, Action, Label, Indicator, IndicatorValue } from './wrapper';
import { Facet } from '../../@types/search';
import FilterPanel from '../FilterPanel';
import { FacetIdToTitle } from '../../utils/formats';
import { PRICE, MILEAGE, MODEL_YEAR } from '../../utils/constants';
import useSearch from '../../hooks/useSearch';

export interface FilterProps {
  label: string;
  activeFilters?: number;
}

const isSelected = (f: Facet, searchParams: URLSearchParams) => {
  switch (f.id) {
    case PRICE:
    case MILEAGE:
    case MODEL_YEAR:
      return searchParams.has(`${f.id}.min`) || searchParams.has(`${f.id}.max`) ? 1 : 0;
    default:
      return f.filters.filter((filter) => filter.selected).length;
  }
};

const Filter = () => {
  const { queryFilter, initialFacets, response } = useSearch();

  const facets = response?.facets;

  const [facet, setFacet] = useState<Facet>();
  const onSelectFacet = useCallback((nextFacet: Facet) => setFacet(nextFacet), []);
  const onClose = useCallback(() => setFacet(undefined), []);

  if (!facets) {
    return null;
  }

  return (
    <>
      {initialFacets && facet && <FilterPanel facet={facet} onClose={onClose} />}
      <List>
        {facets?.map((f) => {
          const selected = isSelected(f, queryFilter.searchParams);
          return (
            <Item key={f.id}>
              <Action
                onClick={() => onSelectFacet(f)}
                title={FacetIdToTitle(f.id)}
                aria-label={f.displayName}
                className={
                  selected > 0
                    ? 'wayke__theme wayke__color--primary-bg wayke__font--bold'
                    : 'wayke__theme wayke__font--regular'
                }
              >
                <Label>{FacetIdToTitle(f.id)}</Label>
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
