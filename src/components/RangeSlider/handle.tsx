import React from 'react';
import { GetHandleProps, SliderItem } from 'react-compound-slider';
import { Handle as OwnHandle } from './wrapper';

interface IHandleProps {
  domain: number[];
  handle: SliderItem;
  getHandleProps: GetHandleProps;
}

export const Handle = ({
  domain: [min, max],
  handle: { id, value, percent },
  getHandleProps,
}: IHandleProps) => (
  <OwnHandle
    role="slider"
    aria-valuemin={min}
    aria-valuemax={max}
    aria-valuenow={value}
    style={{
      left: `${percent}%`,
    }}
    {...getHandleProps(id)}
  />
);
