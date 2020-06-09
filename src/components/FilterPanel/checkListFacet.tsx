import React, { useState, useEffect } from 'react';
import Checklist from '../Checklist';
import OverflowBox from '../OverflowBox';
import { Facet, FacetFilter } from '../../@types/search';

interface ChecklistFacetProps {
  facet: Facet;
  onFilterUpdate: (query: string) => void;
}

const ChecklistFacet = ({ facet, onFilterUpdate }: ChecklistFacetProps) => {
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
    <OverflowBox>
      <Checklist
        radio={false}
        items={facet.filters
          .sort((a, b) => a.displayName.localeCompare(b.displayName))
          .map((f) => ({
            label: f.displayName,
            onClick: () => _onFilterUpdate(f),
            active: selected[f.displayName] !== undefined ? selected[f.displayName] : f.selected,
          }))}
      />
    </OverflowBox>
  );
};

export default ChecklistFacet;
