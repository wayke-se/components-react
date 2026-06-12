import React from 'react';
import { ButtonClear, ButtonContent } from '../Button';
import { Action, Heading, Wrapper } from './wrapper';

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  actionTitle?: string;
}

const SectionHeader = ({ children, onClick, actionTitle }: Props) => (
  <Wrapper>
    <Heading>{children}</Heading>
    {onClick && actionTitle && (
      <Action>
        <ButtonClear as="a" href="#" onClick={onClick}>
          <ButtonContent>{actionTitle}</ButtonContent>
        </ButtonClear>
      </Action>
    )}
  </Wrapper>
);

export default SectionHeader;
