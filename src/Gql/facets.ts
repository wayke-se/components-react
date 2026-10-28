// The filter panel's view of a search: which values a list filter offers and
// which domain a slider covers, read straight from the API responses.

import { MarketCode } from '../@types/market';
import { kmPerOdometerUnit, RANGE_FILTERS, RangeFilter } from './searchParams';
import { AdsResult, Facet, HistogramBucket } from './types';

export interface FacetOption {
  value: string;
  count: number;
  selected: boolean;
}

/**
 * The values of a list filter, with counts from the filtered result (where a
 * selected filter's own facet is counted without it, see useAdsSearch). A
 * selected value is always listed, so it can be unticked.
 */
export const listOptions = (
  field: string,
  params: URLSearchParams,
  facets: Facet[] | undefined
): FacetOption[] => {
  const selected = params.getAll(field);
  const counts = facets?.find((f) => f.field === field)?.counts || [];
  const options = counts.map((c) => ({
    value: c.value,
    count: c.count,
    selected: selected.includes(c.value),
  }));
  selected
    .filter((value) => !counts.some((c) => c.value === value))
    .forEach((value) => options.push({ value, count: 0, selected: true }));
  return options.sort((a, b) => a.value.localeCompare(b.value));
};

export const isRangeFilter = (key: string): key is RangeFilter => key in RANGE_FILTERS;

const histogram = (key: RangeFilter, unfiltered: AdsResult, market: MarketCode) => {
  const h = unfiltered.histograms;
  switch (key) {
    case 'price':
      return h?.price;
    case 'odometer': {
      // The API counts km; the slider shows the market's unit.
      const scale = kmPerOdometerUnit(market);
      return h?.odometerReading?.map((b) => ({
        value: Math.round(b.value / scale),
        count: b.count,
      }));
    }
    case 'privateLease':
      return h?.leasingPrice;
    case 'businessLease':
      return h?.businessLeasingPrice;
    case 'modelYear':
      return unfiltered.facets
        ?.find((f) => f.field === 'modelYear')
        ?.counts.map((c) => ({ value: Number.parseInt(c.value, 10), count: c.count }))
        .filter((b) => Number.isFinite(b.value));
    default:
      return undefined;
  }
};

/** The bucket start values of a slider, ascending, from the unfiltered search. */
export const rangeValues = (
  key: RangeFilter,
  unfiltered: AdsResult | undefined,
  market: MarketCode
): number[] =>
  unfiltered
    ? [...(histogram(key, unfiltered, market) || [])]
        .sort((a: HistogramBucket, b: HistogramBucket) => a.value - b.value)
        .map((b) => b.value)
    : [];

/** How many values of a filter are picked: list values, or 1 for a set range. */
export const selectedCount = (key: string, params: URLSearchParams) =>
  isRangeFilter(key)
    ? params.has(`${key}.min`) || params.has(`${key}.max`)
      ? 1
      : 0
    : params.getAll(key).length;
