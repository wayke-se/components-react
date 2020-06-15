import React, { useCallback } from 'react';

import { Facet } from '../../@types/search';
import Panel from '../Panel';
import { FooterAction, FooterActionItem } from '../Panel/wrapper';
import { ButtonSecondary, ButtonContent, ButtonPrimary } from '../Button';
import Accordion, { AccordionItem } from '../Accordion';
import Repeat from '../Repeat';
import FacetSelector from './faceSelector';
import { FacetIdToTitle } from '../../utils/formats';
import useSearch from '../../hooks/useSearch';

export interface FilterProps {
  label: string;
  activeFilters?: number;
}

export interface Props {
  facet?: Facet;
  onClose: () => void;
}

const FilterPanel = ({ facet, onClose }: Props) => {
  const { loading, response, onFilterUpdate } = useSearch();

  const facets = response?.facets;
  const numberOfHits = response?.documentList.numberOfHits || 0;

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
        {facets?.map((f) => (
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
