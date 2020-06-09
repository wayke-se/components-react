import React, { useState, useCallback } from 'react';
import { Slider, Rail, Handles, Tracks } from 'react-compound-slider';

import { Bar, RangeSpan, RangeSpanItem, Slider as OwnSlider } from './wrapper';
import { Handle } from './handle';
import { Track } from './track';
import { numberSeparator } from '../../utils/formats';

interface RangeSlider {
  domain: number[];
  values: number[];
  steps: number[];
  unit?: string;
  formatValues?: boolean;
  onChange: (values: readonly number[]) => void;
}

const RangeSlider = ({ values, domain, steps, unit, formatValues, onChange }: RangeSlider) => {
  const [current, setCurrent] = useState<number[]>(values);
  const onUpdate = useCallback((values: readonly number[]) => setCurrent(values.slice()), []);

  const first = steps[0];
  const second = steps[1];
  const step = second - first;

  const currentMin = formatValues ? numberSeparator(current[0]) : current[0];
  const currentMax = formatValues ? numberSeparator(current[1]) : current[1];

  return (
    <>
      <OwnSlider>
        <Slider
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
      <RangeSpan>
        <RangeSpanItem>{`${currentMin}${unit ? ` ${unit}` : ''}`}</RangeSpanItem>
        <RangeSpanItem>{`${currentMax}${unit ? ` ${unit}` : ''}`}</RangeSpanItem>
      </RangeSpan>
    </>
  );
};

export default RangeSlider;
