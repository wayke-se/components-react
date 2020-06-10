import React, { useCallback } from 'react';

import { Facet } from '../../@types/search';
import Panel from '../Panel';
import { FooterAction } from '../Result/wrapper';
import { FooterActionItem } from '../Panel/wrapper';
import { ButtonSecondary, ButtonContent, ButtonPrimary } from '../Button';
import Accordion, { AccordionItem } from '../Accordion';
import Repeat from '../Repeat';
import FacetSelector from './faceSelector';
import { FacetIdToTitle } from '../../utils/formats';

export interface FilterProps {
  label: string;
  activeFilters?: number;
}

export interface Props {
  loading: boolean;
  searchParams: URLSearchParams;
  initialFacets: Facet[];
  facets: Facet[];
  facet?: Facet;
  numberOfHits: number;
  onClose: () => void;
  onFilterUpdate: (query: string) => void;
}

const FilterPanel = ({
  loading,
  searchParams,
  initialFacets,
  facets,
  facet,
  numberOfHits,
  onClose,
  onFilterUpdate,
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
        {facets.map((f) => (
          <AccordionItem
            key={f.displayName}
            heading={FacetIdToTitle(f.id)}
            isActive={f.id === facet?.id}
          >
            <Repeat>
              <FacetSelector
                loading={loading}
                searchParams={searchParams}
                initialFacet={initialFacets.find((x) => x.id === f.id)}
                facet={f}
                onFilterUpdate={onFilterUpdate}
              />
            </Repeat>
          </AccordionItem>
        ))}
      </Accordion>
    </Panel>
  );
};

export default FilterPanel;
