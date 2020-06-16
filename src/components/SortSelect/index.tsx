import React from 'react';

import { Wrapper, Select, Option, Icon } from './wrapper';
import { IconChevronDown } from '../Icon';
import { DrivingDistance } from '../../@types/gql/globalTypes';

export interface OptionProps {
  value: number | string | DrivingDistance;
  displayName?: number | string;
}

interface SortSelectProps {
  value: string | number;
  options: OptionProps[];
  unit?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SortSelect = ({ value, options, onChange, unit }: SortSelectProps) => (
  <Wrapper>
    <Select value={value} onChange={onChange}>
      {options.map((option) => (
        <Option key={option.value}>
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

export default SortSelect;
