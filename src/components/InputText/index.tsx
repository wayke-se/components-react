import React from 'react';

import { Wrapper, Input } from './wrapper';

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  placeholder: string;
  label: string;
  value?: string;
  id?: string;
};

const InputText = ({ placeholder, label, value, id }: Props): JSX.Element => (
  <Wrapper>
    <Input placeholder={placeholder} value={value} id={id} aria-label={label} />
  </Wrapper>
);

export default InputText;
