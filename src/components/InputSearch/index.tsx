import React from 'react';

import { Wrapper, Input, Icon } from './wrapper';
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
};

const InputSearch = ({ placeholder, label, value, id, ...props }: Props) => (
  <Wrapper>
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
  </Wrapper>
);

export default InputSearch;
