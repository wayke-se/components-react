import React from 'react';

import { Label, Value, Wrapper } from './wrapper';

interface Props {
  label: string;
  value?: React.ReactNode;
  highlight?: boolean;
}

const RangeSliderLabel = ({ label, value, highlight }: Props) => (
  <Wrapper>
    <Label>{label}</Label>
    {value && <Value isHighlighted={highlight}>{value}</Value>}
  </Wrapper>
);

export default RangeSliderLabel;
