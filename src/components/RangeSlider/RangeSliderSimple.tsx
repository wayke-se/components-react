import React from 'react';
import { Slider, Rail, Handles, Tracks } from 'react-compound-slider';

import { Bar, RangeSpan, RangeSpanItem, Slider as OwnSlider } from './wrapper';
import { Handle } from './handle';
import { Track } from './track';
import { numberSeparator } from '../../utils/formats';

interface RangeSliderProps {
  loading: boolean;
  domain: number[];
  values: number[];
  steps: number[];
  unit?: string;
  formatValues?: boolean;
  onChange: (values: readonly number[]) => void;
}

const RangeSliderSimple = ({
  loading,
  values,
  domain,
  steps,
  unit,
  formatValues,
  onChange,
}: RangeSliderProps) => {
  const first = steps[0];
  const second = steps[1];
  const step = second - first;

  const currentMin = formatValues ? numberSeparator(domain[0]) : domain[0];
  const currentMax = formatValues ? numberSeparator(domain[1]) : domain[1];

  if (steps.length < 2) {
    return null;
  }

  return (
    <>
      <OwnSlider>
        <Slider
          disabled={loading}
          mode={1}
          step={step}
          domain={domain}
          onChange={onChange}
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
          <Tracks right={false}>
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
      {false && (
        <RangeSpan>
          <RangeSpanItem>{`${currentMin}${unit ? ` ${unit}` : ''}`}</RangeSpanItem>
          <RangeSpanItem>{`${currentMax}${unit ? ` ${unit}` : ''}`}</RangeSpanItem>
        </RangeSpan>
      )}
    </>
  );
};

export default RangeSliderSimple;
