import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { DEFAULT_SORT, SORT, withSort } from '../../Gql/searchParams';
import useSearch from '../../State/Search/useSearch';
import { numberSeparator } from '../../utils/formats';
import { sortOptions } from '../../utils/sortOptions';
import { ButtonContent, ButtonSecondary } from '../Button';
import Loader from '../Loader';
import ProgressBar from '../ProgressBar';
import SortSelect from '../SortSelect';
import {
  Body,
  Footer,
  FooterAction,
  FooterProgress,
  Header,
  HeaderCount,
  HeaderSort,
  ResultCount,
  Wrapper,
} from './wrapper';

interface Props {
  children: React.ReactNode;
}

const Result = ({ children }: Props) => {
  const { t } = useTranslation();
  const { loading, loadingMore, result, params, hasMore, loadMore, update } = useSearch();

  const onSortOptionChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => update(withSort(params, e.currentTarget.value)),
    [params, update]
  );

  const numberOfDocuments = result?.hits.length || 0;
  const numberOfHits = result?.found || 0;
  const options = useMemo(() => sortOptions(), []);

  // A new search replaces the list; loading more keeps it and adds to it.
  if (loading && !loadingMore) {
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
        <HeaderSort>
          <SortSelect
            value={params.get(SORT) || DEFAULT_SORT}
            options={options}
            onChange={onSortOptionChange}
          />
        </HeaderSort>
      </Header>
      <Body>{children}</Body>
      <Footer>
        <FooterProgress>
          <ProgressBar valueCurrent={numberOfDocuments} valueMax={numberOfHits} />
        </FooterProgress>
        {hasMore && (
          <FooterAction>
            <ButtonSecondary
              disabled={loadingMore}
              onClick={loadMore}
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
