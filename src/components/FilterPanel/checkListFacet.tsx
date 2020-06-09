import React from 'react';
import Checklist from '../Checklist';
import OverflowBox from '../OverflowBox';
import { Facet } from '../../@types/search';

interface ChecklistFacetProps {
  facet: Facet;
  onFilterUpdate: (query: string) => void;
}

const ChecklistFacet = ({ facet, onFilterUpdate }: ChecklistFacetProps) => {
  return (
    <OverflowBox>
      <Checklist
        radio={false}
        items={facet.filters.map((f) => ({
          label: f.displayName,
          onClick: () => onFilterUpdate(f.query),
          active: f.selected,
        }))}
      />
    </OverflowBox>
  );
};

export default ChecklistFacet;
