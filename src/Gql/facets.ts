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

const averageDelta = (values: number[]) =>
  values.length > 1 ? (values[values.length - 1] - values[0]) / (values.length - 1) : 0;

/**
 * Even steps of 1000 or 500 for wide ranges, else the bucket values themselves.
 * A single bucket, such as one car with business leasing, gets a range from 0
 * so the filter still shows, as in 5.x; a single model year has nothing to pick.
 */
const toSteps = (values: number[], fromZero: boolean) => {
  if (values.length === 1 && fromZero && values[0] > 0) {
    return toSteps([0, values[0]], false);
  }
  const delta = averageDelta(values);
  const max = values[values.length - 1];
  // Math.ceil: uneven buckets would otherwise give a fractional array length.
  if (delta > 1000) return new Array(Math.ceil(max / 1000) + 1).fill(0).map((_, i) => i * 1000);
  if (delta >= 500) return new Array(Math.ceil(max / 500) + 1).fill(0).map((_, i) => i * 500);
  return values;
};

/** The steps of a range filter's slider; fewer than two means there is nothing to pick. */
export const rangeSteps = (
  key: RangeFilter,
  unfiltered: AdsResult | undefined,
  market: MarketCode
): number[] => toSteps(rangeValues(key, unfiltered, market), key !== 'modelYear');
