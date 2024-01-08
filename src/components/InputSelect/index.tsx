import React from 'react';

import { Wrapper, Select, Option, Icon } from './wrapper';
import { IconChevronDown } from '../Icon';

export interface OptionProps {
  value: number | string;
  displayName?: number | string | null;
}

interface Props {
  value?: string | number;
  options?: OptionProps[];
  unit?: string;
  title: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const InputSelect = ({ value, options, onChange, unit, title }: Props) => (
  <Wrapper>
    <Select value={value} onChange={onChange} title={title} aria-label={title}>
      {options?.map((option) => (
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
