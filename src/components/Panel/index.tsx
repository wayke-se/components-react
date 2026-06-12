import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { H1 } from '../Heading';
import { IconCancel } from '../Icon';
import { Portal, PortalNamespace } from '../Portal';
import {
  Body,
  Close,
  CloseBtn,
  Footer,
  Header,
  Heading,
  PanelWrapper,
  UiBlock,
  Wrapper,
} from './wrapper';

interface IPanelPortal {
  id?: string | null;
  title: string | null;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const Panel = ({ id, title, footer, onClose, children }: IPanelPortal) => {
  const { t } = useTranslation();
  return (
    <Portal id={id || PortalNamespace.DefaultPortal}>
      <Wrapper>
        <UiBlock title={t('other.closePanel') || ''} onClick={onClose} />
        <PanelWrapper>
          <Header>
            <Heading>
              <H1 noMargin>{title}</H1>
            </Heading>
            <Close>
              <CloseBtn title={t('other.closePanel') || ''} onClick={onClose}>
                <IconCancel block />
              </CloseBtn>
            </Close>
          </Header>
          <Body>{children}</Body>
          {footer && <Footer>{footer}</Footer>}
        </PanelWrapper>
      </Wrapper>
    </Portal>
  );
};

export default Panel;
