import React, { useCallback, useEffect, useState } from 'react';
import { listOptions } from '../../Gql/facets';
import { toggleListValue } from '../../Gql/searchParams';
import useSearch from '../../State/Search/useSearch';
import PubSub from '../../utils/pubsub/pubsub';
import Checklist from '../Checklist';
import OverflowBox from '../OverflowBox';

interface ChecklistFacetProps {
  id: string;
}

const ChecklistFacet = ({ id }: ChecklistFacetProps) => {
  const { params, result, loading, error, update } = useSearch();
  // Ticks show at once, before the search answers.
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
    <OverflowBox>
      <Checklist
        items={listOptions(id, params, result?.facets).map((option) => ({
          label: option.value,
          onClick: () => onClick(option.value, !option.selected),
          active: pending[option.value] ?? option.selected,
        }))}
      />
    </OverflowBox>
  );
};

export default ChecklistFacet;
