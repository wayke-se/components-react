import React from 'react';
import { useTranslation } from 'react-i18next';
import { IconChevronDown } from '../Icon';
import { Icon, Option, Select, Wrapper } from './wrapper';

export interface OptionProps {
  value: number | string;
  displayName?: number | string;
}

interface SortSelectProps {
  value: string | number;
  options: OptionProps[];
  unit?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SortSelect = ({ value, options, onChange, unit }: SortSelectProps) => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <Select
        value={value}
        onChange={onChange}
        title={t('search.sortButton.text')}
        aria-label={t('search.sortButton.text')}
      >
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
};

export default SortSelect;
