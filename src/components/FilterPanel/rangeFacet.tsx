import React, { useCallback, useState, useEffect } from 'react';
import { Facet } from '../../@types/search';
import RangeSlider from '../RangeSlider';
import useSearch from '../../State/Search/useSearch';
import PubSub from '../../utils/pubsub/pubsub';

interface RangeFacetProps {
  facet: Facet;
  unit?: string;
  formatValues?: boolean;
}

const getInitialValues = (domain: number[], facet: Facet, searchParams: URLSearchParams) => {
  const facetMin = domain[0]; //parseInt(facet.filters[0].displayName, 10);
  const _queryMin = searchParams?.get(`${facet.id}.min`) || null;
  const facetMax = domain[domain.length - 1]; //parseInt(facet.filters[facet.filters.length - 1].displayName, 10);
  const _queryMax = searchParams?.get(`${facet.id}.max`) || null;

  const queryMin = parseInt(_queryMin === null ? `${facetMin}` : _queryMin, 10);
  const min = facetMin > queryMin ? facetMin : queryMin;
  const queryMax = parseInt(_queryMax === null ? `${facetMax}` : _queryMax, 10);
  const max = queryMax > facetMax ? facetMin : queryMax;

  return min || max ? [min ? min : domain[0], max ? max : domain[1]] : domain;
};

const averageDelta = ([x, ...xs]: number[]) => {
  if (x === undefined) return NaN;

  return xs.reduce(([acc, last], x) => [acc + (x - last), x], [0, x])[0] / xs.length;
};

const getSteps = (initialAllValues: number[]) => {
  const delta = averageDelta(initialAllValues);
  const max = Math.floor(initialAllValues[initialAllValues.length - 1] * 1000) / 1000;
  if (delta > 1000) return new Array(max / 1000 + 1).fill('').map((x, i) => i * 1000);
  if (delta <= 1000 && delta >= 500)
    return new Array(max / 500 + 1).fill('').map((x, i) => i * 500);
  return initialAllValues;
};

const RangeFacet = ({ facet, unit, formatValues }: RangeFacetProps) => {
  const { loading, queryFilter, initialFacets, onFilterUpdate } = useSearch();
  const initialFacet = initialFacets?.find((x) => x.id === facet.id);
  const maxPrefix =
    initialFacet?.filters[initialFacet?.filters.length - 1]?.displayName?.includes('+');
  const [state, setValues] = useState<
    { id: string | undefined; steps: number[]; domain: number[]; values: number[] } | undefined
  >(undefined);

  useEffect(() => {
    const _initialAllValues = initialFacet?.filters.map((f) =>
      parseInt(f.displayName.replace(/[\<\>+-]+/g, ''), 10)
    ) || [1, 2];

    const _steps = getSteps(_initialAllValues);
    const domain = [_steps[0], _steps[_steps.length - 1]];

    setValues({
      id: initialFacet?.id,
      steps: _steps,
      domain: [_steps[0], _steps[_steps.length - 1]],
      values: initialFacet?.filters.length
        ? getInitialValues(domain, initialFacet, queryFilter.searchParams)
        : [0, 0],
    });
  }, [initialFacet?.id]);

  useEffect(() => {
    if (state?.id) {
      const init = initialFacet?.filters.length
        ? getInitialValues(state.domain, initialFacet, queryFilter.searchParams)
        : [0, 0];
      const minStr = queryFilter.searchParams?.get(`${facet.id}.min`);
      const maxStr = queryFilter.searchParams?.get(`${facet.id}.max`);

      const min = minStr ? parseFloat(minStr) : init[0];
      const max = maxStr ? parseFloat(maxStr) : init[1];
      if (min !== state.values[0] || max !== state.values[1]) {
        onChange([min, max]);
      }
    }
  }, [queryFilter.searchParams?.toString()]);

  const onChange = useCallback(
    (nextValues: readonly number[]) => {
      if (state?.id) {
        if (state.values[0] !== nextValues[0] || state.values[1] !== nextValues[1]) {
          setValues({ ...state, values: nextValues.slice() });
          const query = new URLSearchParams(queryFilter.searchParams);
          query.set('hits', '30');
          query.delete(`${facet.id}.min`);
          query.delete(`${facet.id}.max`);

          if (nextValues[0] !== state.domain[0]) {
            query.set(`${facet.id}.min`, `${nextValues[0]}`);
          }

          if (nextValues[1] !== state.domain[1]) {
            query.set(`${facet.id}.max`, `${nextValues[1]}`);
          }

          query.sort();
          onFilterUpdate(query.toString());
          PubSub.publish('FilterApply', {
            type: 'range',
            filter: facet.id,
            min: nextValues[0],
            max: nextValues[1],
          });
        }
      }
    },
    [queryFilter.searchParams, state]
  );

  return (
    <>
      {state && (
        <RangeSlider
          loading={loading}
          domain={state.domain}
          values={state.values}
          maxPrefix={maxPrefix ? '+' : undefined}
          steps={state.steps}
          unit={unit}
          onChange={onChange}
          formatValues={formatValues}
        />
      )}
    </>
  );
};

export default RangeFacet;
