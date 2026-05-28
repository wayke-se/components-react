import { useQuery } from '@apollo/client/react';
import SEARCH_ITEM_BRANCH_QUERY from '../queries/SEARCH_ITEM_BRANCH_QUERY';
import { QueryVehicleArgs, Query } from '../@types/codegen/types';
import { asStrict, StrictQueryResult } from './apolloTypes';

const useSearchItemBranch = (
  id?: string | null,
  branch?: string | null
): StrictQueryResult<Query, QueryVehicleArgs> =>
  asStrict(
    useQuery<Query, QueryVehicleArgs>(SEARCH_ITEM_BRANCH_QUERY, {
      variables: { id: id as string, branch: branch as string },
      skip: !id || !branch,
    })
  );

export default useSearchItemBranch;
