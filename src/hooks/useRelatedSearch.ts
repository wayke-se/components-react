import { useContext, useEffect } from 'react';

import { RelatedSearchContext } from '../context/related-context';

const useRelatedSearch = () => {
  const data = useContext(RelatedSearchContext);

  useEffect(() => {
    const searchParams = new URLSearchParams();
    searchParams.set('hits', '3');

    data.fetchRelated(searchParams);
  }, []);

  return data;
};

export default useRelatedSearch;
