import React from 'react';

import { Wrapper } from './wrapper';

interface IProps {
  children?: JSX.Element | JSX.Element[] | string | false;
  tiny?: boolean;
  small?: boolean;
  large?: boolean;
}

const Repeat = ({ children, tiny, small, large }: IProps): JSX.Element => (
  <Wrapper tiny={tiny} small={small} large={large}>
    {children}
  </Wrapper>
);

export default Repeat;
