import React from 'react';

import { Wrapper, Label, Value } from './wrapper';

interface Props {
  label: string;
  value?: string;
  highlight?: boolean;
}

const RangeSliderLabel = ({ label, value, highlight }: Props) => (
  <Wrapper>
    <Label>{label}</Label>
    {value && <Value isHighlighted={highlight}>{value}</Value>}
  </Wrapper>
);

export default RangeSliderLabel;
