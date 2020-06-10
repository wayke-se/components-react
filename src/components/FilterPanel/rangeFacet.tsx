import React, { useCallback, useEffect, useState } from 'react';
import { Facet } from '../../@types/search';
import RangeSlider from '../RangeSlider';

interface RangeFacetProps {
  loading: boolean;
  searchParams: URLSearchParams;
  initialFacet: Facet;
  facet: Facet;
  unit?: string;
  formatValues?: boolean;
  onFilterUpdate: (query: string) => void;
}

const getInitialValues = (domain: number[], facet: Facet, searchParams: URLSearchParams) => {
  const min = searchParams.get(`${facet.id}.min`);
  const max = searchParams.get(`${facet.id}.max`);

  return min || max
    ? [min ? parseInt(min, 10) : domain[0], max ? parseInt(max, 10) : domain[1]]
    : domain;
};

const RangeFacet = ({
  loading,
  searchParams,
  initialFacet,
  facet,
  unit,
  formatValues,
  onFilterUpdate,
}: RangeFacetProps) => {
  const allValues = facet.filters.map((f) => parseInt(f.displayName, 10));
  const initialAllValues = initialFacet.filters.map((f) => parseInt(f.displayName, 10));
  const domain = [initialAllValues[0], initialAllValues[initialAllValues.length - 1]];

  const [values, setValues] = useState(() => getInitialValues(domain, facet, searchParams));

  useEffect(() => {
    if (allValues.length === initialAllValues.length) {
      setValues(domain);
    }
  }, [facet]);

  const onChange = useCallback(
    (values: readonly number[]) => {
      setValues(values.slice());
      const query = new URLSearchParams(searchParams);
      query.delete(`${facet.id}.min`);
      query.delete(`${facet.id}.max`);
      let shouldUpdate = false;

      if (values[0] !== domain[0]) {
        query.set(`${facet.id}.min`, `${values[0]}`);
        shouldUpdate = true;
      }

      if (values[1] !== domain[1]) {
        query.set(`${facet.id}.max`, `${values[1]}`);
        shouldUpdate = true;
      }

      if (shouldUpdate) {
        onFilterUpdate(query.toString());
      }
    },
    [domain, searchParams]
  );

  return (
    <RangeSlider
      loading={loading}
      domain={domain}
      values={values}
      steps={initialAllValues}
      unit={unit}
      onChange={onChange}
      formatValues={formatValues}
    />
  );
};

export default RangeFacet;
