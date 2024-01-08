import * as React from 'react';

import { Spinner, Wrapper } from './wrapper';
import { SrOnly } from '../SrOnly';
import { i18nScoped } from '../../utils/I18n';

interface Props {
  inline?: boolean;
  center?: boolean;
}

const Loader = ({ inline, center }: Props) => {
  return (
    <Wrapper inline={inline} center={center}>
      <Spinner aria-hidden="true" />
      {i18nScoped.isInitialized && <SrOnly>{i18nScoped.t('other.loading')}</SrOnly>}
    </Wrapper>
  );
};

export default Loader;
