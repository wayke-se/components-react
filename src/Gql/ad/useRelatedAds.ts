import { useEffect, useState } from 'react';
import { gqlQuery } from '../client';
import { PublicApiSettings } from '../config';
import { SearchData, SearchHit } from '../types';
import { RELATED_ADS_QUERY } from './queries';

/**
 * "Fler bilar" on the ad page: the latest cars of the same make, the current
 * ad excluded, filled up with the latest of other makes when the make has too
 * few, so a site with one car of a make still shows related cars as 5.x did.
 * There is no more-like-this in the public API.
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
    const latest = (make: string | undefined, perPage: number) =>
      gqlQuery<SearchData>(settings.api, RELATED_ADS_QUERY, {
        market: [settings.market],
        branchGroupId: settings.branchGroupId,
        manufacturer: make ? [make] : undefined,
        perPage,
      }).then((data) => (data.search?.ads?.hits || []).filter((h) => h.ad.id !== adId));

    setLoading(true);
    latest(manufacturer, limit + 1)
      .then(async (sameMake) => {
        if (sameMake.length >= limit || !manufacturer) return sameMake;
        const taken = new Set(sameMake.map((h) => h.ad.id));
        // Enough to skip the current ad and the ones already taken.
        const others = (await latest(undefined, limit * 2 + 1)).filter((h) => !taken.has(h.ad.id));
        return [...sameMake, ...others];
      })
      .then((related) => active && setHits(related.slice(0, limit)))
      .catch(() => undefined)
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [settings.api.url, settings.branchGroupId, adId, manufacturer, limit]);

  return { loading, hits };
};

export default useRelatedAds;
