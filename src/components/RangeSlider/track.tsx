import React from 'react';
import { GetTrackProps, SliderItem } from 'react-compound-slider';
import { Track as OwnTrack } from './wrapper';

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
