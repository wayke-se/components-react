import * as React from 'react';

import { Portal, PortalNamespace } from '../Portal/index';

import { H1 } from '../Heading/index';
import { IconCancel } from '../Icon/index';
import {
  Body,
  Content,
  Dialog,
  Header,
  Heading,
  UiBlock,
  Wrapper,
  Close,
  CloseBtn,
} from './wrapper';
import { useTranslation } from 'react-i18next';

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
