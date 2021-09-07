import React, { useCallback, useEffect, useState } from 'react';
import { numberSeparator } from '../../utils/formats';
import RangeSliderLabel from '../RangeSliderLabel';
import { RepeatTiny } from '../Repeat';
import RangeSliderSimple from './RangeSliderSimple';

interface SliderWithLabelProps {
  label: string;
  values: number[];
  domain: number[];
  steps: number[];
  loading: boolean;
  unit: string;
  formatValues?: boolean;
  onChange: (values: readonly number[]) => void;
}

const SliderWithLabel = ({
  label,
  values,
  domain,
  steps,
  loading,
  unit,
  formatValues,
  onChange,
}: SliderWithLabelProps) => {
  const [local, setLocal] = useState<number[] | undefined>(steps);

  const onUpdate = useCallback((nextValues: readonly number[]) => {
    setLocal([...nextValues]);
  }, []);

  useEffect(() => {
    if (!loading) setLocal(undefined);
  }, [loading]);

  return (
    <>
      <RepeatTiny>
        <RangeSliderLabel
          label={label}
          value={`${numberSeparator(local?.[0] || values[0])}${unit ? ` ${unit}` : ''}`}
        />
      </RepeatTiny>
      <RepeatTiny>
        <RangeSliderSimple
          loading={loading}
          values={values}
          domain={domain}
          steps={steps}
          onChange={onChange}
          onUpdate={onUpdate}
          unit={unit}
          formatValues={formatValues}
        />
      </RepeatTiny>
    </>
  );
};

export default SliderWithLabel;
