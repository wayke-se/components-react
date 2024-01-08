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
import Loader from '../Loader';
import { numberSeparator } from '../../utils/formats';
import useSearch from '../../State/Search/useSearch';
import SortSelect, { OptionProps } from '../SortSelect';
import { getTranslatedSortOptionDisplayName } from '../../utils/sortOptions';
import { useTranslation } from 'react-i18next';

interface Props {
  children: React.ReactNode;
}

const Result = ({ children }: Props) => {
  const { t } = useTranslation();
  const { loading, response, documents, queryFilter, onLoadMore, onFilterUpdate } = useSearch();

  const onSortOptionChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => onFilterUpdate(e.currentTarget.value),
    []
  );

  const numberOfDocuments = documents?.length || 0;
  const numberOfHits = response?.documentList.numberOfHits || 0;
  const useSkeletons = !!queryFilter?.concatResult;

  const selectedSortOption = response?.documentList.sortOptions.find((x) => x.selected)?.query;
  const sortOptions = response?.documentList.sortOptions
    .filter((x) => x.displayName !== 'relevance')
    .map(
      (so): OptionProps => ({
        value: so.query,
        displayName: getTranslatedSortOptionDisplayName(so.displayName),
      })
    );

  if (loading && !useSkeletons) {
    return <Loader />;
  }
  return (
    <Wrapper>
      <Header>
        <HeaderCount>
          <ResultCount>{`${numberSeparator(numberOfHits)} ${
            numberOfHits === 1 ? t('search.result.plural') : t('search.result.plural')
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
          <ProgressBar valueCurrent={numberOfDocuments} valueMax={numberOfHits} />
        </FooterProgress>
        {numberOfDocuments !== numberOfHits && (
          <FooterAction>
            <ButtonSecondary
              disabled={loading}
              onClick={onLoadMore}
              title={t('search.showMore.title')}
              aria-label={t('search.showMore.text')}
            >
              <ButtonContent>{t('search.showMore.text')}</ButtonContent>
            </ButtonSecondary>
          </FooterAction>
        )}
      </Footer>
    </Wrapper>
  );
};

export default Result;
