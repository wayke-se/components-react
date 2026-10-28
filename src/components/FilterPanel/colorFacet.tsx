import React, { useCallback, useEffect, useState } from 'react';
import { listOptions } from '../../Gql/facets';
import { toggleListValue } from '../../Gql/searchParams';
import useSearch from '../../State/Search/useSearch';
import { getHexColorFromDisplayName } from '../../utils/converters';
import PubSub from '../../utils/pubsub/pubsub';
import ColorSelect from '../ColorSelect';

interface ColorSelectFacetProps {
  id: string;
}

const ColorSelectFacet = ({ id }: ColorSelectFacetProps) => {
  const { params, result, loading, error, update } = useSearch();
  const [pending, setPending] = useState<{ [value: string]: boolean }>({});
  useEffect(() => setPending({}), [result, error]);

  const onClick = useCallback(
    (value: string, checked: boolean) => {
      if (loading) return;
      setPending((current) => ({ ...current, [value]: checked }));
      PubSub.publish('FilterApply', { type: 'checkbox', filter: id, value, checked });
      update(toggleListValue(params, id, value));
    },
    [loading, params, id, update]
  );

  return (
    <ColorSelect
      items={listOptions(id, params, result?.facets).map((option) => ({
        label: option.value,
        onClick: () => onClick(option.value, !option.selected),
        active: pending[option.value] ?? option.selected,
        hex: [getHexColorFromDisplayName(option.value)],
      }))}
    />
  );
};

export default ColorSelectFacet;
