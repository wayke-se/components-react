import React from 'react';

import {
  Wrapper,
  Header,
  HeaderCount,
  HeaderSort,
  Body,
  Footer,
  FooterProgress,
  FooterAction,
  ResultCount,
} from './wrapper';
import ProgressBar from '../ProgressBar';
import { ButtonSecondary, ButtonContent } from '../Button';
import { Spinner } from '../Loader/wrapper';
import { numberSeparator } from '../../utils/formats';
import useSearch from '../../hooks/useSearch';
import SortSelect from '../SortSelect';

interface Props {
  children: JSX.Element | JSX.Element[] | false;
}

const Result = ({ children }: Props) => {
  const { loading, response, documents, queryFilter, onLoadMore } = useSearch();

  const numberOfDocuments = documents?.length || 0;
  const numberOfHits = response?.documentList.numberOfHits || 0;
  const useSkeletons = !!queryFilter?.concatResult;

  if (loading && !useSkeletons) {
    return <Spinner />;
  }
  return (
    <Wrapper>
      <Header>
        <HeaderCount>
          <ResultCount>{`${numberSeparator(numberOfHits)} ${
            numberOfHits === 1 ? 'bil' : 'bilar'
          }`}</ResultCount>
        </HeaderCount>
        <HeaderSort>
          <SortSelect value={1} options={[{ value: 1 }, { value: 2 }]} />
        </HeaderSort>
      </Header>
      <Body>{children}</Body>
      <Footer>
        <FooterProgress>
          <ProgressBar unit="bilar" valueCurrent={numberOfDocuments} valueMax={numberOfHits} />
        </FooterProgress>
        <FooterAction>
          <ButtonSecondary
            disabled={loading || numberOfDocuments === numberOfHits}
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
