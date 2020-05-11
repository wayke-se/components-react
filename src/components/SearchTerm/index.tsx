import React from 'react';

import { Wrapper } from './wrapper';

interface Props {
  children: string;
}

const SearchTerm = ({ children }: Props) => <Wrapper>{children}</Wrapper>;

export default SearchTerm;
