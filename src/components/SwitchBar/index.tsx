import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ButtonInline } from '../Button';
import { IconInfo } from '../Icon';
import Modal from '../Modal';
import { Action, Body, Header, Info, InfoBtn, InfoContent, Title, Wrapper } from './wrapper';

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
