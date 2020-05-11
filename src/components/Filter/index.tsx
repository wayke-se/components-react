import React from 'react';

import { List, Item, Action, Label, Indicator, IndicatorValue } from './wrapper';

export interface FilterProps {
  label: string;
  activeFilters?: number;
}

export interface Props {
  filters?: FilterProps[];
}

const Filter = ({ filters }: Props) => {
  if (!filters) {
    return null;
  }

  return (
    <List>
      {filters.map((filter) => (
        <Item key={filter.label}>
          <Action
            title={filter.label}
            aria-label={filter.label}
            className={
              filter.activeFilters && filter.activeFilters > 0
                ? 'wayke__theme wayke__color--primary-bg wayke__font--bold'
                : 'wayke__theme wayke__font--regular'
            }
          >
            <Label>{filter.label}</Label>
            {filter.activeFilters && filter.activeFilters > 0 && (
              <Indicator>
                <IndicatorValue>{filter.activeFilters}</IndicatorValue>
              </Indicator>
            )}
          </Action>
        </Item>
      ))}
    </List>
  );
};

export default Filter;
