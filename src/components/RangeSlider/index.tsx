import * as React from 'react';

import { Bar, Handle, RangeSpan, RangeSpanItem, Slider, Track } from './wrapper';

const RangeSlider = () => (
  <>
    <Slider>
      <Bar>
        <Track style={{ left: '0', right: '50%' }} />
        <Handle style={{ left: '0' }} />
        <Handle style={{ left: '50%' }} />
      </Bar>
    </Slider>
    <RangeSpan>
      <RangeSpanItem>0 mil</RangeSpanItem>
      <RangeSpanItem>20 000+ mil</RangeSpanItem>
    </RangeSpan>
  </>
);

export default RangeSlider;
