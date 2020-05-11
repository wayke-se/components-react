import React from 'react';

import { Wrapper } from './wrapper';

interface IProps {
  children?: JSX.Element | JSX.Element[] | string | false;
  small?: boolean;
  large?: boolean;
}

const Repeat = ({ children, small, large }: IProps): JSX.Element => (
  <Wrapper small={small} large={large}>
    {children}
  </Wrapper>
);

export default Repeat;
