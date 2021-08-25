import React, { useCallback, useState } from 'react';
import { Facet } from '../../@types/search';
import RangeSlider from '../RangeSlider/index';
import useSearch from '../../State/Search/useSearch';

interface RangeFacetProps {
  facet: Facet;
  unit?: string;
  formatValues?: boolean;
}

const getInitialValues = (domain: number[], facet: Facet, searchParams: URLSearchParams) => {
  const facetMin = parseInt(facet.filters[0].displayName, 10);
  const _queryMin = searchParams?.get(`${facet.id}.min`);
  const facetMax = parseInt(facet.filters[facet.filters.length - 1].displayName, 10);
  const _queryMax = searchParams?.get(`${facet.id}.max`);

  const queryMin = parseInt(_queryMin === null ? `${facetMin}` : _queryMin, 10);
  const min = facetMin > queryMin ? facetMin : queryMin;
  const queryMax = parseInt(_queryMax === null ? `${facetMax}` : _queryMax, 10);
  const max = queryMax > facetMax ? facetMin : queryMax;

  return min || max ? [min ? min : domain[0], max ? max : domain[1]] : domain;
};

const RangeFacet = ({ facet, unit, formatValues }: RangeFacetProps) => {
  const { loading, queryFilter, initialFacets, onFilterUpdate } = useSearch();
  const initialFacet = initialFacets?.find((x) => x.id === facet.id);
  const maxPrefix =
    initialFacet?.filters[initialFacet?.filters.length - 1].displayName.includes('+');

  const initialAllValues = initialFacet?.filters.map((f) =>
    parseInt(f.displayName.replace('+', ''), 10)
  ) || [1, 2];
  const domain = [initialAllValues[0], initialAllValues[initialAllValues.length - 1]];

  const [values, setValues] = useState(() =>
    initialFacet?.filters.length
      ? getInitialValues(domain, initialFacet, queryFilter.searchParams)
      : [0, 0]
  );

  const onChange = useCallback(
    (nextValues: readonly number[]) => {
      if (values[0] !== nextValues[0] || values[1] !== nextValues[1]) {
        setValues(nextValues.slice());
        const query = new URLSearchParams(queryFilter.searchParams);
        query.delete(`${facet.id}.min`);
        query.delete(`${facet.id}.max`);

        if (nextValues[0] !== domain[0]) {
          query.set(`${facet.id}.min`, `${nextValues[0]}`);
        }

        if (nextValues[1] !== domain[1]) {
          query.set(`${facet.id}.max`, `${nextValues[1]}`);
        }

        onFilterUpdate(query.toString());
      }
    },
    [domain, queryFilter, values]
  );

  return (
    <RangeSlider
      loading={loading}
      domain={domain}
      values={values}
      maxPrefix={maxPrefix ? '+' : undefined}
      steps={initialAllValues}
      unit={unit}
      onChange={onChange}
      formatValues={formatValues}
    />
  );
};

export default RangeFacet;
