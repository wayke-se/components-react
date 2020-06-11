import { useQuery } from '@apollo/react-hooks';
import { SearchItem, SearchItemVariables } from '../@types/gql/SearchItem';
import { QueryResult } from '@apollo/react-common';
import SEARCH_ITEM_QUERY from '../queries/SEARCH_ITEM_QUERY';

const useSearchItem = (id?: string): QueryResult<SearchItem> =>
  useQuery<SearchItem, SearchItemVariables>(SEARCH_ITEM_QUERY, {
    variables: { id: id as string },
    skip: !id,
  });

export default useSearchItem;
