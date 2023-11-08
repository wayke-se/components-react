import * as React from 'react';

import { Spinner, Wrapper } from './wrapper';
import { SrOnly } from '../SrOnly/index';
import { useTranslation } from 'react-i18next';

interface Props {
  inline?: boolean;
  center?: boolean;
}

const Loader = ({ inline, center }: Props) => {
  const { t } = useTranslation();
  return (
    <Wrapper inline={inline} center={center}>
      <Spinner aria-hidden="true" />
      <SrOnly>{t('other.loading')}</SrOnly>
    </Wrapper>
  );
};

export default Loader;
