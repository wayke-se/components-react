import { useEffect, useState } from 'react';
import { gqlQuery } from '../client';
import { PublicApiSettings } from '../config';
import { SearchData, SearchHit } from '../types';
import { RELATED_ADS_QUERY } from './queries';

/**
 * "Fler bilar" on the ad page: the latest cars of the same make, the current
 * ad excluded. There is no more-like-this in the public API; this is what
 * web-ui-v2 does too.
 */
const useRelatedAds = (
  settings: PublicApiSettings,
  adId: string,
  manufacturer?: string,
  limit = 3
) => {
  const [hits, setHits] = useState<SearchHit[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    gqlQuery<SearchData>(settings.api, RELATED_ADS_QUERY, {
      market: [settings.market],
      branchGroupId: settings.branchGroupId,
      manufacturer: manufacturer ? [manufacturer] : undefined,
      perPage: limit + 1,
    })
      .then((data) => {
        const ads = data.search?.ads;
        if (active && ads) setHits(ads.hits.filter((h) => h.ad.id !== adId).slice(0, limit));
      })
      .catch(() => undefined)
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [settings.api.url, settings.branchGroupId, adId, manufacturer, limit]);

  return { loading, hits };
};

export default useRelatedAds;
