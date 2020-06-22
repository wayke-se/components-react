import React from 'react';

import { Wrapper } from './wrapper';

interface Props {
  children?: React.ReactNode;
  small?: boolean;
}

const Content = ({ children, small }: Props) => <Wrapper small={small}>{children}</Wrapper>;

export default Content;
