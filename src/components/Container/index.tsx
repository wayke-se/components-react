import React from 'react';

import { Wrapper } from './wrapper';

interface Props {
  children: React.ReactNode;
}

const Container = ({ children }: Props) => <Wrapper>{children}</Wrapper>;

export default Container;
