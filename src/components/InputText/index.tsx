import React from 'react';

import { Input, Wrapper } from './wrapper';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  value: string;
  label: string;
};

const InputText = ({ label, ...props }: Props) => (
  <Wrapper>
    <Input aria-label={label} {...props} />
  </Wrapper>
);

export default InputText;
