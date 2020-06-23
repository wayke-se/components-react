import React, { useCallback } from 'react';

import { Facet } from '../../@types/search';
import Panel from '../Panel/index';
import { FooterAction, FooterActionItem } from '../Panel/wrapper';
import { ButtonSecondary, ButtonContent, ButtonPrimary } from '../Button/index';
import Accordion, { AccordionItem } from '../Accordion/index';
import Repeat from '../Repeat/index';
import FacetSelector from './faceSelector';
import { FacetIdToTitle } from '../../utils/formats';
import { SearchFilterTypes } from '../../@types/filter';

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
  const onClearFilters = useCallback(() => onFilterUpdate(''), []);

  return (
    <Panel
      title="Filtrera"
      onClose={onClose}
      footer={
        <>
          <FooterAction>
            <FooterActionItem>
              <ButtonSecondary fullWidth disabled={loading} onClick={onClearFilters}>
                <ButtonContent>Rensa alla</ButtonContent>
              </ButtonSecondary>
            </FooterActionItem>
            <FooterActionItem>
              <ButtonPrimary fullWidth disabled={loading} onClick={onClose}>
                <ButtonContent>{`Visa ${numberOfHits} ${
                  numberOfHits === 1 ? 'bil' : 'bilar'
                }`}</ButtonContent>
              </ButtonPrimary>
            </FooterActionItem>
          </FooterAction>
        </>
      }
    >
      <Accordion>
        {filteredFacets.map((f) => (
          <AccordionItem
            key={f.displayName}
            heading={FacetIdToTitle(f.id)}
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
