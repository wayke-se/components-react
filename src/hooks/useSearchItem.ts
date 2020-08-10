import { useQuery, QueryResult } from '@apollo/client';
import SEARCH_ITEM_QUERY from '../queries/SEARCH_ITEM_QUERY';
import { QueryVehicleArgs, Query } from '../@types/codegen/types';

const useSearchItem = (id?: string): QueryResult<Query, QueryVehicleArgs> =>
  useQuery<Query, QueryVehicleArgs>(SEARCH_ITEM_QUERY, {
    variables: { id: id as string },
    skip: !id,
  });

export default useSearchItem;
