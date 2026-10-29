// The ad page's data from the public API. Older links carry a legacy id that
// differs from ad.id: when byAdId finds nothing the id is resolved through
// byIterationId and the address bar is rewritten to ad.id, as web-ui-v2 does.

import { useEffect, useState } from 'react';
import { gqlQuery } from '../client';
import { PublicApiSettings } from '../config';
import { AD_ID_BY_LEGACY_ID_QUERY, AD_QUERY } from './queries';
import { Ad, AdData, AdIdByLegacyIdData } from './types';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const fetchAd = async (settings: PublicApiSettings, id: string): Promise<Ad | null> => {
  const data = await gqlQuery<AdData>(settings.api, AD_QUERY, { id });
  return data.ads?.byAdId || null;
};

const resolveLegacyId = async (settings: PublicApiSettings, id: string) => {
  if (!UUID.test(id)) return null;
  try {
    const data = await gqlQuery<AdIdByLegacyIdData>(settings.api, AD_ID_BY_LEGACY_ID_QUERY, {
      id,
    });
    return data.ads?.byIterationId?.ads?.[0]?.id || null;
  } catch (_e) {
    return null;
  }
};

const replaceIdInUrl = (from: string, to: string) => {
  const { pathname, search, hash } = window.location;
  if (pathname.includes(from) || hash.includes(from)) {
    history.replaceState(
      history.state,
      '',
      `${pathname.replace(from, to)}${search}${hash.replace(from, to)}`
    );
  }
};

const useAd = (id: string, settings: PublicApiSettings) => {
  const [ad, setAd] = useState<Ad>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(false);
    (async () => {
      let next = await fetchAd(settings, id);
      if (!next) {
        const adId = await resolveLegacyId(settings, id);
        if (adId && adId !== id) {
          next = await fetchAd(settings, adId);
          if (next) replaceIdInUrl(id, adId);
        }
      }
      if (active) setAd(next || undefined);
    })()
      .catch(() => active && setError(true))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [id, settings.api.url, settings.api.apiKey]);

  return { loading, error, ad };
};

export default useAd;
