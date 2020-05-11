import React from 'react';

import { Wrapper } from './wrapper';

interface IProps {
  children?: JSX.Element | JSX.Element[] | string | false;
}

const OverflowBox = ({ children }: IProps): JSX.Element => <Wrapper>{children}</Wrapper>;

export default OverflowBox;
