import { useQuery, QueryResult } from '@apollo/client';
import SEARCH_ITEM_BRANCH_QUERY from '../queries/SEARCH_ITEM_BRANCH_QUERY';
import { QueryVehicleArgs, Query } from '../@types/codegen/types';

const useSearchItemBranch = (
  id?: string | null,
  branch?: string | null
): QueryResult<Query, QueryVehicleArgs> =>
  useQuery<Query, QueryVehicleArgs>(SEARCH_ITEM_BRANCH_QUERY, {
    variables: { id: id as string, branch: branch as string },
    skip: !id || !branch,
  });

export default useSearchItemBranch;
