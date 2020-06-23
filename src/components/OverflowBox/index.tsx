import React from 'react';

import { Wrapper } from './wrapper';

interface IProps {
  children?: React.ReactNode;
}

const OverflowBox = ({ children }: IProps) => <Wrapper>{children}</Wrapper>;

export default OverflowBox;
