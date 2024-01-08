import React, { useCallback } from 'react';

import { Facet } from '../../@types/search';
import Panel from '../Panel';
import { FooterAction, FooterActionItem } from '../Panel/wrapper';
import { ButtonSecondary, ButtonContent, ButtonPrimary } from '../Button';
import Accordion, { AccordionItem } from '../Accordion';
import { Repeat } from '../Repeat';
import FacetSelector from './faceSelector';
import { SearchFilterTypes } from '../../@types/filter';
import { useTranslation } from 'react-i18next';

export interface FilterProps {
  label: string;
  activeFilters?: number;
}

export interface Props {
  facet?: Facet;
  loading: boolean;
  filteredFacets: Facet[];
  filterList?: SearchFilterTypes[];
  numberOfHits: number;
  onClose: () => void;
  onFilterUpdate: (nextQuery: string) => void;
}

const FilterPanel = ({
  facet,
  filteredFacets,
  numberOfHits,
  loading,
  onFilterUpdate,
  onClose,
}: Props) => {
  const { t } = useTranslation();
  const onClearFilters = useCallback(() => onFilterUpdate(''), []);

  return (
    <Panel
      title={t('search.filter')}
      onClose={onClose}
      footer={
        <>
          <FooterAction>
            <FooterActionItem>
              <ButtonSecondary fullWidth disabled={loading} onClick={onClearFilters}>
                <ButtonContent>{t('search.clearAllFilters.text')}</ButtonContent>
              </ButtonSecondary>
            </FooterActionItem>
            <FooterActionItem>
              <ButtonPrimary fullWidth disabled={loading} onClick={onClose}>
                <ButtonContent>
                  {t('search.showNumberOfCustomUnit', {
                    count: numberOfHits || 0,
                    unit: t(`search.result.${(numberOfHits || 0) === 1 ? 'singular' : 'plural'}`),
                  })}
                </ButtonContent>
              </ButtonPrimary>
            </FooterActionItem>
          </FooterAction>
        </>
      }
    >
      <Accordion>
        {filteredFacets
          .filter((x) => x.filters.length)
          .map((f) => (
            <AccordionItem
              key={f.displayName}
              heading={f.displayName}
              isActive={f.id === facet?.id}
            >
              <Repeat>
                <FacetSelector facet={f} />
              </Repeat>
            </AccordionItem>
          ))}
      </Accordion>
    </Panel>
  );
};

export default FilterPanel;
