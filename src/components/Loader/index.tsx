import * as React from 'react';

import { Spinner, Wrapper } from './wrapper';

interface Props {
  inline?: boolean;
  center?: boolean;
}

const Loader = ({ inline, center }: Props) => (
  <Wrapper inline={inline} center={center}>
    <Spinner />
  </Wrapper>
);

export default Loader;
