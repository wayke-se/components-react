import React, { useEffect, useRef, useState } from 'react';
import { Range, Root, Thumb, Track } from './wrapper';

interface RangeSliderProps {
  loading: boolean;
  domain: number[];
  values: number[];
  steps: number[];
  /** Read out with the handle. */
  label: string;
  onChange: (values: readonly number[]) => void;
  onUpdate?: (values: readonly number[]) => void;
}

/** One handle, for a single value such as the down payment. */
const RangeSliderSimple = ({
  loading,
  values,
  domain,
  steps,
  label,
  onChange,
  onUpdate,
}: RangeSliderProps) => {
  const [current, setCurrent] = useState<number[]>(values);
  const latest = useRef(values);

  useEffect(() => {
    latest.current = values;
    setCurrent(values);
  }, [values[0]]);

  if (steps.length < 2) {
    return null;
  }

  return (
    <Root
      min={domain[0]}
      max={domain[1]}
      step={steps[1] - steps[0]}
      value={current}
      disabled={loading}
      onValueChange={(next) => {
        latest.current = next;
        setCurrent(next);
        onUpdate?.(next);
      }}
      onValueCommit={onChange}
      // A drag commits here, see RangeSlider's commitDrag.
      onPointerUp={() => {
        if (latest.current[0] !== values[0]) onChange(latest.current);
      }}
    >
      <Track>
        <Range />
      </Track>
      <Thumb aria-label={label} />
    </Root>
  );
};

export default RangeSliderSimple;
