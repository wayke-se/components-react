import React, { useState, useCallback } from 'react';

import { List, Item, Action, Label, Indicator, IndicatorValue } from './wrapper';
import { Facet } from '../../@types/search';
import FilterPanel from '../FilterPanel';
import { FacetIdToTitle } from '../../utils/formats';

export interface FilterProps {
  label: string;
  activeFilters?: number;
}

export interface Props {
  initialFacets: Facet[] | undefined;
  facets: Facet[] | undefined;
  numberOfHits: number;
  onFilterUpdate: (query: string) => void;
}

const Filter = ({ initialFacets, facets, numberOfHits, onFilterUpdate }: Props) => {
  const [facet, setFacet] = useState<Facet>();

  const onSelectFacet = useCallback((nextFacet: Facet) => setFacet(nextFacet), []);
  const onClose = useCallback(() => setFacet(undefined), []);

  if (!facets) {
    return null;
  }

  return (
    <>
      {initialFacets && facet && (
        <FilterPanel
          initialFacets={initialFacets}
          facets={facets}
          facet={facet}
          numberOfHits={numberOfHits}
          onClose={onClose}
          onFilterUpdate={onFilterUpdate}
        />
      )}
      <List>
        {facets?.map((f) => {
          const selected = f.filters.filter((filter) => filter.selected).length;
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
