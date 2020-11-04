import React, { useState, useCallback } from 'react';

import { Wrapper, Header, Body, Info, Action, InfoContent, InfoBtn, Title } from './wrapper';
import Modal from '../Modal/index';
import { ButtonInline } from '../Button/index';
import { IconInfo } from '../Icon/index';

interface Props {
  title: string;
  body?: string;
  actionTitle?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const SwitchBar = ({ title, body, actionTitle, children, onClick }: Props) => {
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
                <InfoBtn onClick={onToggleInfo} title="Mer information">
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
