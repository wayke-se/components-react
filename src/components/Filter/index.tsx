import React, { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { resolveFilterList, SearchFilterTypes } from '../../@types/filter';
import { isRangeFilter, listOptions, rangeSteps, selectedCount } from '../../Gql/facets';
import useSearch from '../../State/Search/useSearch';
import useSettings from '../../State/Settings/useSettings';
import FilterPanel, { PanelFilter } from '../FilterPanel';
import { Action, Indicator, IndicatorValue, Item, Label, List } from './wrapper';

interface FilterProps {
  filterList?: SearchFilterTypes[];
}

const Filter = ({ filterList }: FilterProps) => {
  const { t } = useTranslation();
  const { marketCode } = useSettings();
  const { params, result, unfiltered } = useSearch();
  const [open, setOpen] = useState<string>();
  const onClose = useCallback(() => setOpen(undefined), []);

  // The filters in the order asked for, leaving out those with nothing to pick.
  const filters = useMemo<PanelFilter[]>(
    () =>
      resolveFilterList(filterList)
        .filter((f) =>
          isRangeFilter(f.filterName)
            ? rangeSteps(f.filterName, unfiltered, marketCode).length > 1
            : listOptions(f.filterName, params, result?.facets).length > 0
        )
        .map((f) => ({
          id: f.filterName,
          displayName: f.displayName || t(`filter.${f.filterName}`),
        })),
    [filterList, unfiltered, result, params, marketCode]
  );

  if (!result) return null;

  return (
    <>
      {open && <FilterPanel filters={filters} open={open} onClose={onClose} />}
      <List>
        {filters.map((f) => {
          const selected = selectedCount(f.id, params);
          return (
            <Item key={f.id}>
              <Action
                onClick={() => setOpen(f.id)}
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
