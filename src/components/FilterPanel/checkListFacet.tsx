import React, { useState, useEffect, useCallback } from 'react';
import Checklist from '../Checklist/index';
import OverflowBox from '../OverflowBox/index';
import { Facet, FacetFilter } from '../../@types/search';
import useSearch from '../../State/Search/useSearch';

interface ChecklistFacetProps {
  facet: Facet;
}

const ChecklistFacet = ({ facet }: ChecklistFacetProps) => {
  const { loading, error, onFilterUpdate } = useSearch();
  const [selected, setSelected] = useState<{ [key: string]: boolean }>();
  useEffect(() => {
    setSelected(undefined);
  }, [facet, error]);

  const onClick = useCallback(
    (f: FacetFilter) => {
      if (!loading) {
        setSelected({
          ...selected,
          [f.displayName]: !f.selected,
        });
        onFilterUpdate(f.query);
      }
    },
    [loading]
  );

  return (
    <OverflowBox>
      <Checklist
        items={facet.filters
          .sort((a, b) => a.displayName.localeCompare(b.displayName))
          .map((f) => ({
            label: f.displayName,
            onClick: () => onClick(f),
            active: selected?.[f.displayName] !== undefined ? selected[f.displayName] : f.selected,
          }))}
      />
    </OverflowBox>
  );
};

export default ChecklistFacet;
