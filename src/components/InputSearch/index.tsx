import React from 'react';
import { IconSearch } from '../Icon';
import { Action, ActionBtn, Input, Label, Search, Wrapper } from './wrapper';

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

const InputSearch = React.forwardRef<HTMLDivElement, Props>(
  ({ placeholder, label, value, id, onSearch, onChange, onKeyDown, children, ...aria }, ref) => (
    <Wrapper ref={ref}>
      <Label htmlFor={id}>{label}</Label>
      <Search>
        <Input
          placeholder={placeholder}
          name="search"
          value={value}
          id={id}
          onChange={onChange}
          onKeyDown={onKeyDown}
          autoComplete="off"
          {...aria}
        />
        {children}
      </Search>
      <Action>
        <ActionBtn onClick={onSearch} title={`Genomför ${label}`} aria-label={`Genomför ${label}`}>
          <IconSearch block />
        </ActionBtn>
      </Action>
    </Wrapper>
  )
);

InputSearch.displayName = 'InputSearch';

export default InputSearch;
