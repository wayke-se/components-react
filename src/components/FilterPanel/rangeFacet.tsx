import React from 'react';
import { Facet } from '../../@types/search';
import RangeSlider from '../RangeSlider';

interface RangeFacetProps {
  initialFacet: Facet;
  facet: Facet;
  unit?: string;
  formatValues?: boolean;
  onFilterUpdate: (query: string) => void;
}

const RangeFacet = ({
  initialFacet,
  facet,
  unit,
  formatValues,
  onFilterUpdate,
}: RangeFacetProps) => {
  const onChange = (values: readonly number[]) => {
    onFilterUpdate(`${facet.id}.min=${values[0]}.0&${facet.id}.max=${values[1]}.0`);
  };

  const allValues = facet.filters.map((f) => parseInt(f.displayName, 10));
  const values = [allValues[0], allValues[allValues.length - 1]];

  const steps = initialFacet.filters.map((f) => parseInt(f.displayName, 10));
  const min = steps[0];
  const max = steps[steps.length - 1];

  const domain = [min, max];

  return (
    <RangeSlider
      domain={domain}
      values={values}
      steps={steps}
      unit={unit}
      onChange={onChange}
      formatValues={formatValues}
    />
  );
};

export default RangeFacet;
