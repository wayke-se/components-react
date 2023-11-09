import React, { useState, useEffect, useCallback } from 'react';

import { Facet, FacetFilter } from '../../@types/search';
import ColorSelect from '../ColorSelect';
import useSearch from '../../State/Search/useSearch';
import { getHexColorFromDisplayName } from '../../utils/converters';

interface ColorSelectFacetProps {
  facet: Facet;
}

const ColorSelectFacet = ({ facet }: ColorSelectFacetProps) => {
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
    <ColorSelect
      items={facet.filters
        .sort((a, b) => a.displayName.localeCompare(b.displayName))
        .map((f) => ({
          label: f.displayName,
          onClick: () => onClick(f),
          active: selected?.[f.displayName] !== undefined ? selected[f.displayName] : f.selected,
          hex: [getHexColorFromDisplayName(f.displayName)],
        }))}
    />
  );
};

export default ColorSelectFacet;
