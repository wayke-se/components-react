import React from 'react';

import { Input, Wrapper } from './wrapper';

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  value: string;
  placeholder: string;
  label: string;
};

const InputText = ({ placeholder, label, value, id, onChange, onKeyDown }: Props) => (
  <Wrapper>
    <Input
      placeholder={placeholder}
      value={value}
      id={id}
      aria-label={label}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  </Wrapper>
);

export default InputText;
