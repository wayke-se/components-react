// Typeahead for the search field: `search.ads(q).suggest`. Each suggestion
// carries the filters it stands for, applied as URL params when it is picked.

import { gqlQuery } from './client';
import { PublicApiSettings } from './config';
import { SUGGEST_QUERY } from './queries';
import { SuggestData, Suggestion } from './types';

export const fetchSuggestions = async (
  settings: PublicApiSettings,
  q: string,
  limit = 6
): Promise<Suggestion[]> => {
  const data = await gqlQuery<SuggestData>(settings.api, SUGGEST_QUERY, {
    market: [settings.market],
    branchGroupId: settings.branchGroupId,
    q,
    limit,
  });
  return data.search?.ads?.suggest || [];
};

/**
 * The suggestion's filters as URL params. Built with URLSearchParams so values
 * with `+` or `&` (Bensin+El) survive the round trip.
 */
export const suggestionParams = (suggestion: Suggestion) =>
  new URLSearchParams(suggestion.filters.map((f) => [f.field, f.value]));
