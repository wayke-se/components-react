import React, { useState, useEffect } from 'react';

import { Facet, FacetFilter } from '../../@types/search';
import ColorSelect from '../ColorSelect';

interface ColorSelectFacetProps {
  facet: Facet;
  onFilterUpdate: (query: string) => void;
}

const ColorSelectFacet = ({ facet, onFilterUpdate }: ColorSelectFacetProps) => {
  const [selected, setSelected] = useState<{ [key: string]: boolean }>({});

  const _onFilterUpdate = (f: FacetFilter) => {
    setSelected({
      ...selected,
      [f.displayName]: !f.selected,
    });
    onFilterUpdate(f.query);
  };

  useEffect(() => {
    setSelected({});
  }, [facet]);

  return (
    <ColorSelect
      items={facet.filters
        .sort((a, b) => a.displayName.localeCompare(b.displayName))
        .map((f) => ({
          label: f.displayName,
          onClick: () => _onFilterUpdate(f),
          active: selected[f.displayName] !== undefined ? selected[f.displayName] : f.selected,
          hex: ['#fff'],
        }))}
    />
  );
};

export default ColorSelectFacet;
