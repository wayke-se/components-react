import React from 'react';

import { Facet } from '../../@types/search';
import ColorSelect from '../ColorSelect';

interface ColorSelectFacetProps {
  facet: Facet;
  onFilterUpdate: (query: string) => void;
}

const ColorSelectFacet = ({ facet, onFilterUpdate }: ColorSelectFacetProps) => {
  return (
    <ColorSelect
      items={facet.filters.map((f) => ({
        label: f.displayName,
        onClick: () => onFilterUpdate(f.query),
        active: f.selected,
        hex: ['#fff'],
      }))}
    />
  );
};

export default ColorSelectFacet;
