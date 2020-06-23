import React from 'react';

import { Wrapper, Search, Action, ActionBtn, Input, Icon } from './wrapper';
import { IconSearch } from '../Icon';

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type OmitInputProps = Omit<InputProps, 'type' | 'className' | 'ref'>;

type Props = InputProps & {
  placeholder: string;
  label: string;
  value?: string;
  id: string;
  onSearch: () => void;
};

const InputSearch = ({ placeholder, label, value, id, onSearch, ...props }: Props) => (
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
        {...(props as OmitInputProps)}
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
