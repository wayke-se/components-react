import React from 'react';

import { Wrapper } from './wrapper';

interface Props {
  id?: string;
  children: React.ReactNode;
}

const InputError = ({ id, children }: Props) => (
  <Wrapper id={id} role="alert" aria-live="polite">
    {children}
  </Wrapper>
);

export default InputError;
