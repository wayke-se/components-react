import { Money, SearchHit } from './types';

/** An amount from the API, or undefined when it is missing or not above zero. */
export const toAmount = (money?: Money | null) => {
  const n = money ? Number.parseFloat(money.amount) : Number.NaN;
  return Number.isFinite(n) && n > 0 ? n : undefined;
};

/** The first image of a hit, if any. */
export const hitImage = (hit: SearchHit) => hit.ad.media?.items?.find((i) => i?.url)?.url;
