import * as React from 'react';

import { Spinner, Wrapper } from './wrapper';
import { SrOnly } from '../SrOnly';

interface Props {
  inline?: boolean;
  center?: boolean;
}

const Loader = ({ inline, center }: Props) => (
  <Wrapper inline={inline} center={center}>
    <Spinner aria-hidden="true" />
    <SrOnly>Laddar...</SrOnly>
  </Wrapper>
);

export default Loader;
