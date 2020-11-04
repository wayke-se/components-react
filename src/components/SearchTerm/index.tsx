import React from 'react';

import { Wrapper, Query, Clear } from './wrapper';
import { IconCancel } from '../Icon';

interface Props {
  children: string;
  onClear?: () => void;
  clearTitle?: string;
}

const SearchTerm = ({ children, onClear, clearTitle }: Props) => (
  <Wrapper>
    <Query>{children}</Query>
    {onClear && (
      <Clear onClick={onClear} title={clearTitle ? clearTitle : 'Rensa fritext'}>
        <IconCancel block />
      </Clear>
    )}
  </Wrapper>
);

export default SearchTerm;
