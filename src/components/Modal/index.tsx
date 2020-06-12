import * as React from 'react';

import { Portal, PortalNamespace } from '../Portal';

import { H1 } from '../Heading';
import { IconCancel } from '../Icon';
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

interface ModalProps {
  id?: string | null;
  title: string | null;
  children: Array<JSX.Element | false> | JSX.Element | false;
  onClose: (e: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>) => void;
}

const Modal = ({ id, title, onClose, children }: ModalProps) => {
  return (
    <Portal id={id || PortalNamespace.DefaultPortal}>
      <Wrapper>
        <UiBlock onClick={onClose} title="Stäng modal" />
        <Dialog>
          <Content>
            <Header>
              <Heading>
                <H1 noMargin>{title}</H1>
              </Heading>
              <Close>
                <CloseBtn onClick={onClose} title="Stäng modal">
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
