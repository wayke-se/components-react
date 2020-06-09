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
import { Spinner } from '../Loader/wrapper';

interface Props {
  loading: boolean;
  numberOfDocuments: number;
  numberOfHits: number;
  useSkeletons?: boolean;
  onLoadMore: () => void;
  children: JSX.Element | JSX.Element[];
}

const Result = ({
  loading,
  numberOfDocuments,
  numberOfHits,
  useSkeletons,
  onLoadMore,
  children,
}: Props) => {
  if (loading && !useSkeletons) {
    return <Spinner />;
  }
  return (
    <Wrapper>
      <Header>
        <ResultCount>{numberOfHits} bilar</ResultCount>
      </Header>
      <Body>{children}</Body>
      <Footer>
        <FooterProgress>
          <ProgressBar unit="bilar" valueCurrent={numberOfDocuments} valueMax={numberOfHits} />
        </FooterProgress>
        <FooterAction>
          <ButtonSecondary
            disabled={loading}
            onClick={onLoadMore}
            title="Visa fler"
            aria-label="Visa fler"
          >
            <ButtonContent>Visa fler</ButtonContent>
          </ButtonSecondary>
        </FooterAction>
      </Footer>
    </Wrapper>
  );
};

export default Result;
