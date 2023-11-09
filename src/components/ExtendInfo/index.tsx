import React, { useState, useCallback } from 'react';

import { Wrapper, Header, Title, Info, InfoBtn, Extend } from './wrapper';
import { IconInfo } from '../Icon';
import { useTranslation } from 'react-i18next';

interface Props {
  title: string;
  children?: React.ReactNode;
}

const ExtendInfo = ({ title, children }: Props) => {
  const { t } = useTranslation();
  const [extend, setExtend] = useState(false);
  const onToggleExtend = useCallback(() => setExtend(!extend), [extend]);

  return (
    <Wrapper>
      <Header>
        <Title>{title}</Title>
        {children && (
          <Info>
            <InfoBtn onClick={onToggleExtend} title={t('common.moreInformation') || ''}>
              <IconInfo block />
            </InfoBtn>
          </Info>
        )}
      </Header>
      {extend && <Extend>{children}</Extend>}
    </Wrapper>
  );
};

export default ExtendInfo;
