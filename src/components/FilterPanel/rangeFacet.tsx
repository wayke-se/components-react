import React, { useCallback, useMemo } from 'react';
import { rangeValues } from '../../Gql/facets';
import { canonicalParams, RangeFilter } from '../../Gql/searchParams';
import useSearch from '../../State/Search/useSearch';
import useSettings from '../../State/Settings/useSettings';
import PubSub from '../../utils/pubsub/pubsub';
import RangeSlider from '../RangeSlider';

interface RangeFacetProps {
  id: RangeFilter;
  unit?: string;
  formatValues?: boolean;
}

const averageDelta = (values: number[]) =>
  values.length > 1 ? (values[values.length - 1] - values[0]) / (values.length - 1) : 0;

/** Even steps of 1000 or 500 for wide ranges, else the bucket values themselves. */
const toSteps = (values: number[]) => {
  const delta = averageDelta(values);
  const max = values[values.length - 1];
  // Math.ceil: uneven buckets would otherwise give a fractional array length.
  if (delta > 1000) return new Array(Math.ceil(max / 1000) + 1).fill(0).map((_, i) => i * 1000);
  if (delta >= 500) return new Array(Math.ceil(max / 500) + 1).fill(0).map((_, i) => i * 500);
  return values;
};

const toInt = (value: string | null) => {
  const n = value === null ? Number.NaN : Number.parseInt(value, 10);
  return Number.isFinite(n) ? n : undefined;
};

const RangeFacet = ({ id, unit, formatValues }: RangeFacetProps) => {
  const { params, unfiltered, loading, update } = useSearch();
  const { marketCode } = useSettings();

  const steps = useMemo(() => toSteps(rangeValues(id, unfiltered, marketCode)), [unfiltered, id]);
  const domain = [steps[0], steps[steps.length - 1]];
  const clamp = (n: number) => Math.min(Math.max(n, domain[0]), domain[1]);
  const values = [
    clamp(toInt(params.get(`${id}.min`)) ?? domain[0]),
    clamp(toInt(params.get(`${id}.max`)) ?? domain[1]),
  ];

  const onChange = useCallback(
    (next: readonly number[]) => {
      if (next[0] === values[0] && next[1] === values[1]) return;
      const query = new URLSearchParams(params);
      query.delete(`${id}.min`);
      query.delete(`${id}.max`);
      // At the edges the range is open: the top bucket means "and above".
      if (next[0] !== domain[0]) query.set(`${id}.min`, `${next[0]}`);
      if (next[1] !== domain[1]) query.set(`${id}.max`, `${next[1]}`);
      update(canonicalParams(query));
      PubSub.publish('FilterApply', { type: 'range', filter: id, min: next[0], max: next[1] });
    },
    [params, id, values[0], values[1], domain[0], domain[1], update]
  );

  if (steps.length < 2) return null;

  return (
    <RangeSlider
      loading={loading}
      domain={domain}
      values={values}
      maxPrefix={id === 'modelYear' ? undefined : '+'}
      steps={steps}
      unit={unit}
      onChange={onChange}
      formatValues={formatValues}
    />
  );
};

export default RangeFacet;
