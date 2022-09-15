import React from 'react';
import { Track as OwnTrack } from './wrapper';
import { SliderItem, GetTrackProps } from 'react-compound-slider';

interface ITrackProps {
  source: SliderItem;
  target: SliderItem;
  getTrackProps: GetTrackProps;
}

export const Track = ({ source, target, getTrackProps }: ITrackProps) => (
  <OwnTrack
    style={{
      left: `${source.percent}%`,
      width: `${target.percent - source.percent}%`,
    }}
    {...getTrackProps()}
  />
);
