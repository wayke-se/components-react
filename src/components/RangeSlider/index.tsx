import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { numberSeparator } from '../../utils/formats';
import { Range, RangeSpan, RangeSpanItem, Root, Thumb, Track } from './wrapper';

/** The smallest gap between two steps, so every bucket edge can be reached. */
const smallestStep = (steps: number[]) =>
  steps.reduce(
    (smallest, step, index) =>
      index === 0 ? smallest : Math.min(smallest, step - steps[index - 1]),
    Number.MAX_SAFE_INTEGER
  );

interface RangeSliderProps {
  loading: boolean;
  domain: number[];
  values: number[];
  steps: number[];
  /** The filter's name, read out with each handle. */
  label?: string;
  unit?: string;
  formatValues?: boolean;
  maxPrefix?: string;
  onChange: (values: readonly number[]) => void;
}

const RangeSlider = ({
  loading,
  values,
  domain,
  steps,
  label,
  unit,
  formatValues,
  maxPrefix,
  onChange,
}: RangeSliderProps) => {
  const { t } = useTranslation();
  // Follows the handles while they move; the search only changes when they are let go.
  const [current, setCurrent] = useState<number[]>(values);
  // The last value moved to, also before React has rendered it.
  const latest = useRef(values);
  const move = (next: number[]) => {
    latest.current = next;
    setCurrent(next);
  };

  useEffect(() => {
    move(values);
  }, [values[0], values[1]]);

  // Radix 1.6.1 compares a drag's end with stale values and never calls onValueCommit
  // for it; web-ui-v2's RangeSlider works around it the same way.
  const commitDrag = () => {
    const next = latest.current;
    if (next[0] !== values[0] || next[1] !== values[1]) onChange(next);
  };

  const format = (value: number) => (formatValues ? numberSeparator(value) : value);
  const suffix = unit ? ` ${unit}` : '';
  const equal = domain[0] === domain[1];
  const thumbLabel = (bound: 'min' | 'max') =>
    [label, t(`rangeSlider.${bound}`)].filter(Boolean).join(', ');

  return (
    <>
      {equal ? (
        // One value to pick: both handles at the ends, nothing to move.
        <Root min={0} max={1} value={[0, 1]} disabled>
          <Track>
            <Range />
          </Track>
          <Thumb aria-label={thumbLabel('min')} />
          <Thumb aria-label={thumbLabel('max')} />
        </Root>
      ) : (
        <Root
          min={domain[0]}
          max={domain[1]}
          step={smallestStep(steps)}
          value={current}
          disabled={loading}
          onValueChange={move}
          // Keys commit here; a drag commits on pointerup, see commitDrag.
          onValueCommit={onChange}
          onPointerUp={commitDrag}
        >
          <Track>
            <Range />
          </Track>
          <Thumb aria-label={thumbLabel('min')} />
          <Thumb aria-label={thumbLabel('max')} />
        </Root>
      )}
      <RangeSpan>
        <RangeSpanItem>{`${format(current[0])}${suffix}`}</RangeSpanItem>
        <RangeSpanItem>{`${format(current[1])}${
          maxPrefix && current[1] === domain[1] ? maxPrefix : ''
        }${suffix}`}</RangeSpanItem>
      </RangeSpan>
    </>
  );
};

export default RangeSlider;
