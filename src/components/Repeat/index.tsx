import React from 'react';

import { Wrapper } from './wrapper';

interface IProps {
  children?: React.ReactNode;
  tiny?: boolean;
  small?: boolean;
  large?: boolean;
}

const Repeat = ({ children, tiny, small, large }: IProps) => (
  <Wrapper tiny={tiny} small={small} large={large}>
    {children}
  </Wrapper>
);

export default Repeat;
