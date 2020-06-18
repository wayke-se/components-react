import React from 'react';

import { Wrapper, Select, Option, Icon } from './wrapper';
import { IconChevronDown } from '../Icon';

export interface OptionProps {
  value: number | string;
  displayName?: number | string;
}

interface Props {
  value?: string | number;
  options: OptionProps[];
  unit?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const InputSelect = ({ value, options, onChange, unit }: Props) => (
  <Wrapper>
    <Select value={value} onChange={onChange}>
      {options.map((option) => (
        <Option key={option.value} value={option.value}>
          {option.displayName || option.value}
          {unit ? ` ${unit}` : ''}
        </Option>
      ))}
    </Select>
    <Icon>
      <IconChevronDown block />
    </Icon>
  </Wrapper>
);

export default InputSelect;
