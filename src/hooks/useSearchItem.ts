import { useQuery } from '@apollo/client/react';
import { Query, QueryVehicleArgs } from '../@types/codegen/types';
import SEARCH_ITEM_QUERY from '../queries/SEARCH_ITEM_QUERY';
import { asStrict, StrictQueryResult } from './apolloTypes';

const useSearchItem = (id?: string): StrictQueryResult<Query, QueryVehicleArgs> =>
  asStrict(
    useQuery<Query, QueryVehicleArgs>(SEARCH_ITEM_QUERY, {
      variables: { id: id as string },
      skip: !id,
    })
  );

export default useSearchItem;
