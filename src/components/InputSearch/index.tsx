import React from 'react';

import { Wrapper, Search, Action, ActionBtn, Input, Icon } from './wrapper';
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
    <Search>
      <Icon htmlFor={id}>
        <IconSearch block />
      </Icon>
      <Input
        placeholder={placeholder}
        name="search"
        value={value}
        id={id}
        aria-label={label}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </Search>
    <Action>
      <ActionBtn onClick={onSearch}>
        <IconSearch block />
      </ActionBtn>
    </Action>
  </Wrapper>
);

export default InputSearch;
