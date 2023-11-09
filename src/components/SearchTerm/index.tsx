import React from 'react';

import { Wrapper, Query, Clear } from './wrapper';
import { IconCancel } from '../Icon';
import { useTranslation } from 'react-i18next';

interface Props {
  children: string;
  onClear?: () => void;
  clearTitle?: string;
}

const SearchTerm = ({ children, onClear, clearTitle }: Props) => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <Query>{children}</Query>
      {onClear && (
        <Clear onClick={onClear} title={clearTitle ? clearTitle : t('search.freeText')}>
          <IconCancel block />
        </Clear>
      )}
    </Wrapper>
  );
};

export default SearchTerm;
