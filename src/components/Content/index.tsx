import React from 'react';

import { Wrapper } from './wrapper';

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  small?: boolean;
};

const Content = ({ children, small, dangerouslySetInnerHTML }: Props) => (
  <Wrapper small={small} dangerouslySetInnerHTML={dangerouslySetInnerHTML}>
    {children}
  </Wrapper>
);

export default Content;
