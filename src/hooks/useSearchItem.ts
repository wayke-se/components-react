import { useQuery } from '@apollo/react-hooks';
import { QueryResult } from '@apollo/react-common';
import SEARCH_ITEM_QUERY from '../queries/SEARCH_ITEM_QUERY';
import { QueryVehicleArgs, Query } from '../@types/codegen/types';

const useSearchItem = (id?: string): QueryResult<Query> =>
  useQuery<Query, QueryVehicleArgs>(SEARCH_ITEM_QUERY, {
    variables: { id: id as string },
    skip: !id,
  });

export default useSearchItem;
