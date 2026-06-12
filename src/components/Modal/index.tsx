import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { H1 } from '../Heading';
import { IconCancel } from '../Icon';
import { Portal, PortalNamespace } from '../Portal';
import {
  Body,
  Close,
  CloseBtn,
  Content,
  Dialog,
  Header,
  Heading,
  UiBlock,
  Wrapper,
} from './wrapper';

interface ModalProps {
  id?: string | null;
  title: string | null;
  children: React.ReactNode;
  onClose: (e: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>) => void;
}

const Modal = ({ id, title, onClose, children }: ModalProps) => {
  const { t } = useTranslation();
  return (
    <Portal id={id || PortalNamespace.DefaultPortal}>
      <Wrapper onClick={(e) => e.stopPropagation()}>
        <UiBlock onClick={onClose} title={t('other.closeModal') || ''} />
        <Dialog>
          <Content>
            <Header>
              <Heading>
                <H1 noMargin>{title}</H1>
              </Heading>
              <Close>
                <CloseBtn onClick={onClose} title={t('other.closeModal') || ''}>
                  <IconCancel block />
                </CloseBtn>
              </Close>
            </Header>
            <Body>{children}</Body>
          </Content>
        </Dialog>
      </Wrapper>
    </Portal>
  );
};

export default Modal;
