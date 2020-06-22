import { useContext, useEffect } from 'react';

import { RelatedSearchContext } from '../context/related-context';

const useRelatedSearch = (modelYear: number, modelSeries: string | null) => {
  const data = useContext(RelatedSearchContext);

  useEffect(() => {
    if (modelYear && modelSeries) {
      const searchParams = new URLSearchParams();
      searchParams.set('modelYear.min', `${modelYear}`);
      searchParams.set('modelYear.max', `${modelYear}`);
      searchParams.set('modelSeries', modelSeries);
      searchParams.set('hits', '3');

      data.fetchRelated(searchParams);
    }
  }, [modelYear, modelSeries]);

  return data;
};

export default useRelatedSearch;
