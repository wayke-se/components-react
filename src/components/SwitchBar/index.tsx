import React, { useState, useCallback } from 'react';

import { Wrapper, Header, Body, Info, Action, InfoContent, InfoBtn, Title } from './wrapper';
import Modal from '../Modal/index';
import { ButtonInline } from '../Button/index';
import { IconInfo } from '../Icon/index';
import { useTranslation } from 'react-i18next';

interface Props {
  title: string;
  body?: string;
  actionTitle?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const SwitchBar = ({ title, body, actionTitle, children, onClick }: Props) => {
  const { t } = useTranslation();
  const [info, setInfo] = useState(false);
  const onToggleInfo = useCallback(() => setInfo(!info), [info]);

  return (
    <>
      <Wrapper>
        <Header>
          <Info>
            <InfoContent>
              <Title>{title}</Title>
            </InfoContent>
            {children && (
              <InfoContent>
                <InfoBtn onClick={onToggleInfo} title={t('common.moreInformation') || ''}>
                  <IconInfo block />
                </InfoBtn>
              </InfoContent>
            )}
          </Info>
          {actionTitle && (
            <Action>
              <ButtonInline onClick={onClick} title={actionTitle}>
                {actionTitle}
              </ButtonInline>
            </Action>
          )}
        </Header>
        {body && <Body>{body}</Body>}
      </Wrapper>
      {info && (
        <Modal title={title} onClose={onToggleInfo}>
          {children}
        </Modal>
      )}
    </>
  );
};

export default SwitchBar;
