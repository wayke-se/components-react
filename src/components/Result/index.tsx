import React from 'react';

import {
  Wrapper,
  Header,
  Body,
  Footer,
  FooterProgress,
  FooterAction,
  ResultCount,
} from './wrapper';
import ProgressBar from '../ProgressBar';
import { ButtonSecondary, ButtonContent } from '../Button';

interface Props {
  children: JSX.Element | JSX.Element[];
}

const Result = ({ children }: Props) => (
  <Wrapper>
    <Header>
      <ResultCount>21 bilar</ResultCount>
    </Header>
    <Body>{children}</Body>
    <Footer>
      <FooterProgress>
        <ProgressBar unit="bilar" valueCurrent={11} valueMax={21} />
      </FooterProgress>
      <FooterAction>
        <ButtonSecondary title="Visa fler" aria-label="Visa fler">
          <ButtonContent>Visa fler</ButtonContent>
        </ButtonSecondary>
      </FooterAction>
    </Footer>
  </Wrapper>
);

export default Result;
