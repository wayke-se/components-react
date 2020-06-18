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
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputText = ({ placeholder, label, value, id, onChange }: Props): JSX.Element => (
  <Wrapper>
    <Input placeholder={placeholder} value={value} id={id} aria-label={label} onChange={onChange} />
  </Wrapper>
);

export default InputText;
