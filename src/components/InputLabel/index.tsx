import React from 'react';

import { Wrapper } from './wrapper';

interface Props {
  children: string;
  htmlFor?: string;
}

const InputLabel = ({ children, htmlFor }: Props) => (
  <Wrapper htmlFor={htmlFor}>{children}</Wrapper>
);

export default InputLabel;
