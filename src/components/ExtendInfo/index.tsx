import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IconInfo } from '../Icon';
import { Extend, Header, Info, InfoBtn, Title, Wrapper } from './wrapper';

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
