import React, { useState, useCallback } from 'react';
import { Slider, Rail, Handles, Tracks } from 'react-compound-slider';

import {
  Bar,
  RangeSpan,
  RangeSpanItem,
  Slider as OwnSlider,
  Track as OwnTrack,
  Handle as OwnHandle,
} from './wrapper';
import { Handle } from './handle';
import { Track } from './track';
import { numberSeparator } from '../../utils/formats';

const getSteps = (steps: number[]) => {
  let current = Number.MAX_SAFE_INTEGER;
  steps.forEach((step, index) => {
    if (index !== 0) {
      const c = step - steps[index - 1];
      if (c < current) {
        current = c;
      }
    }
  });
  return current;
};

interface RangeSliderProps {
  loading: boolean;
  domain: number[];
  values: number[];
  steps: number[];
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
  unit,
  formatValues,
  maxPrefix,
  onChange,
}: RangeSliderProps) => {
  const [current, setCurrent] = useState<number[]>(values);
  const onUpdate = useCallback(
    (nextValues: readonly number[]) => {
      if (!isNaN(nextValues[0]) && !isNaN(nextValues[1])) {
        setCurrent(nextValues.slice());
      }
    },
    [values]
  );

  const step = getSteps(steps);

  const currentMin = formatValues ? numberSeparator(current[0]) : current[0];
  const currentMax = formatValues ? numberSeparator(current[1]) : current[1];
  const equal = domain[0] === domain[1];
  const _maxPrefix = maxPrefix && domain[1] === current[1] ? maxPrefix : undefined;

  return (
    <>
      {equal ? (
        <OwnSlider>
          <Bar>
            <OwnTrack style={{ left: '0', width: '100%' }} />
            <OwnHandle role="slider" aria-disabled style={{ left: '0' }} />
            <OwnHandle role="slider" aria-disabled style={{ left: '100%' }} />
          </Bar>
        </OwnSlider>
      ) : (
        <OwnSlider>
          <Slider
            disabled={loading}
            mode={1}
            step={step}
            domain={domain}
            onChange={onChange}
            onUpdate={onUpdate}
            values={values}
            rootStyle={{ position: 'relative' }}
          >
            <Rail>{({ getRailProps }) => <Bar {...getRailProps()} />}</Rail>
            <Handles>
              {({ handles, getHandleProps }) => (
                <div className="slider-handles">
                  {handles.map((handle) => (
                    <Handle
                      key={handle.id}
                      handle={handle}
                      domain={domain}
                      getHandleProps={getHandleProps}
                    />
                  ))}
                </div>
              )}
            </Handles>
            <Tracks left={false} right={false}>
              {({ tracks, getTrackProps }) => (
                <div className="slider-tracks">
                  {tracks.map(({ id, source, target }) => (
                    <Track key={id} source={source} target={target} getTrackProps={getTrackProps} />
                  ))}
                </div>
              )}
            </Tracks>
          </Slider>
        </OwnSlider>
      )}
      <RangeSpan>
        <RangeSpanItem>{`${currentMin}${unit ? ` ${unit}` : ''}`}</RangeSpanItem>
        <RangeSpanItem>{`${currentMax}${_maxPrefix ? _maxPrefix : ''}${
          unit ? ` ${unit}` : ''
        }`}</RangeSpanItem>
      </RangeSpan>
    </>
  );
};

export default RangeSlider;
