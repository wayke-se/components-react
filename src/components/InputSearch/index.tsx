import React from 'react';

import { Wrapper, Search, Action, ActionBtn, Input, Label } from './wrapper';
import { IconSearch } from '../Icon/index';

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type Props = InputProps & {
  placeholder: string;
  label: string;
  value?: string;
  id: string;
  onSearch: () => void;
};

const InputSearch = ({ placeholder, label, value, id, onSearch, onChange, onKeyDown }: Props) => (
  <Wrapper>
    <Label htmlFor={id}>{label}</Label>
    <Search>
      <Input
        placeholder={placeholder}
        name="search"
        value={value}
        id={id}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </Search>
    <Action>
      <ActionBtn onClick={onSearch} title={`Genomför ${label}`} aria-label={`Genomför ${label}`}>
        <IconSearch block />
      </ActionBtn>
    </Action>
  </Wrapper>
);

export default InputSearch;
