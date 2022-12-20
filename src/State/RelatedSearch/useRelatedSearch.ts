import { useContext, useEffect } from 'react';

import { RelatedSearchContext } from './RelatedSearchContext';

const useRelatedSearch = (id: string, authorizedReseller?: boolean) => {
  const data = useContext(RelatedSearchContext);

  useEffect(() => {
    const searchParams = new URLSearchParams();
    searchParams.set('hits', '3');
    if (data.moreLikeThisUrl && id) {
      searchParams.set('id', id);
    }
    if (authorizedReseller) {
      searchParams.set('isAuthorizedResellerForManufacturer', 'true');
    }
    data.fetchRelated(searchParams);
  }, [id]);

  return data;
};

export default useRelatedSearch;
