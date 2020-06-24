import { useQuery } from '@apollo/react-hooks';
import { QueryResult } from '@apollo/react-common';
import BRANCH_QUERY from '../queries/BRANCH_QUERY';
import { QueryBranchArgs, Query } from '../@types/codegen/types';

const useBranch = (id?: string | null): QueryResult<Query> =>
  useQuery<Query, QueryBranchArgs>(BRANCH_QUERY, {
    variables: { id: id as string },
    skip: !id,
  });

export default useBranch;
