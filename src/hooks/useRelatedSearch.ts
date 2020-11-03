import { useContext, useEffect } from 'react';

import { RelatedSearchContext } from '../context/related-context';

const useRelatedSearch = (id: string) => {
  const data = useContext(RelatedSearchContext);

  useEffect(() => {
    const searchParams = new URLSearchParams();
    searchParams.set('hits', '3');
    if (data.moreLikeThisUrl && id) {
      searchParams.set('id', id);
    }
    data.fetchRelated(searchParams);
  }, [id]);

  return data;
};

export default useRelatedSearch;
