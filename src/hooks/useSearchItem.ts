import { useQuery } from '@apollo/client/react';
import SEARCH_ITEM_QUERY from '../queries/SEARCH_ITEM_QUERY';
import { QueryVehicleArgs, Query } from '../@types/codegen/types';
import { asStrict, StrictQueryResult } from './apolloTypes';

const useSearchItem = (id?: string): StrictQueryResult<Query, QueryVehicleArgs> =>
  asStrict(
    useQuery<Query, QueryVehicleArgs>(SEARCH_ITEM_QUERY, {
      variables: { id: id as string },
      skip: !id,
    })
  );

export default useSearchItem;
