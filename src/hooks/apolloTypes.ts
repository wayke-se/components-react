import { OperationVariables } from '@apollo/client';
import { QueryResult } from '@apollo/client/react';

// Apollo v4 types data as DeepPartial<TData> to reflect that GraphQL
// responses can have any field missing. The codebase predates that and
// assumes data is the full TData; cast at the hook boundary to keep the
// consumer contract stable until we revisit field-by-field nullability.
export type StrictQueryResult<TData, TVars extends OperationVariables = OperationVariables> = Omit<
  QueryResult<TData, TVars>,
  'data'
> & { data?: TData };

export const asStrict = <TData, TVars extends OperationVariables>(
  result: QueryResult<TData, TVars>
): StrictQueryResult<TData, TVars> => result as unknown as StrictQueryResult<TData, TVars>;
