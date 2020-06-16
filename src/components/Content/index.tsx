import React from 'react';

import { Wrapper } from './wrapper';

interface Props {
  children?: JSX.Element | Array<JSX.Element | false | null | string> | null | string | false;
  small?: boolean;
}

const Content = ({ children, small }: Props) => <Wrapper small={small}>{children}</Wrapper>;

export default Content;
