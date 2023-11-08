import * as React from 'react';

import {
  PanelWrapper,
  Close,
  CloseBtn,
  Header,
  Heading,
  Body,
  Footer,
  UiBlock,
  Wrapper,
} from './wrapper';
import { Portal, PortalNamespace } from '../Portal/index';
import { H1 } from '../Heading/index';
import { IconCancel } from '../Icon/index';
import { useTranslation } from 'react-i18next';

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
