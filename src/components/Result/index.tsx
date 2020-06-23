import React, { useCallback } from 'react';

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
import SortSelect, { OptionProps } from '../SortSelect';
import { getTranslatedSortOptionDisplayName } from '../../utils/sortOptions';

interface Props {
  children: React.ReactNode;
}

const Result = ({ children }: Props) => {
  const { loading, response, documents, queryFilter, onLoadMore, onFilterUpdate } = useSearch();

  const onSortOptionChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => onFilterUpdate(e.currentTarget.value),
    []
  );

  const numberOfDocuments = documents?.length || 0;
  const numberOfHits = response?.documentList.numberOfHits || 0;
  const useSkeletons = !!queryFilter?.concatResult;

  const selectedSortOption = response?.documentList.sortOptions.find((x) => x.selected)?.query;
  const sortOptions = response?.documentList.sortOptions.map(
    (so): OptionProps => ({
      value: so.query,
      displayName: getTranslatedSortOptionDisplayName(so.displayName),
    })
  );

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
        {sortOptions && selectedSortOption && (
          <HeaderSort>
            <SortSelect
              value={selectedSortOption}
              options={sortOptions}
              onChange={onSortOptionChange}
            />
          </HeaderSort>
        )}
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
