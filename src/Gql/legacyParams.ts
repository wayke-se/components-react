// Translates the query strings sites have produced over the years into
// the grammar in searchParams.ts, so that old links, bookmarks and the queries
// dealers saved in the CMS keep applying the same filters:
//
//  1. `qf=<base64 of a query string>` from the filter panel and the product
//     grid's "show all" link, and the older `qf=<base64 of {"cars": <base64 of
//     a query string>}>` from the search before that. `f=` was the same idea in
//     the waykeComposite era.
//  2. Key renames where the value is unchanged (Elastic → public API naming).
//  3. `query` → `q`, legacy sort tokens → sort keys, `offset` → `page`;
//     `hits`, `campaign` and other dead keys are dropped.
//
// Mirrors web-ui-v2's legacyParams.ts, trimmed to the keys dealer sites used.

import { canonicalParams, DEFAULT_SORT, isKnownKey } from './searchParams';

const SCALAR_ALIASES: Record<string, string> = {
  query: 'q',
  branch: 'branchDisplayName',
  branches: 'branchDisplayName',
  color: 'colorName',
  drivingWheel: 'drivetrainType',
  'properties.segment': 'segment',
  chassis: 'bodyStyle',
  fuelTypes: 'fuelType',
  hasManufacturerPackaging: 'certifiedPreOwned',
};

const RANGE_BASE_ALIASES: Record<string, string> = {
  mileage: 'odometer',
  odometerValueAsKm: 'odometer',
  leasingPrice: 'privateLease',
  businessLeasingPrice: 'businessLease',
};

/** Legacy `sort=` tokens from the external search API; null = the default order. */
const SORT_ALIASES: Record<string, string | null> = {
  relevance: null,
  itemSortDesc: null,
  'published-desc': DEFAULT_SORT,
  'published-asc': 'published-asc',
  'price-asc': 'price-asc',
  'price-desc': 'price-desc',
  'modelyear-asc': 'modelYear-asc',
  'modelyear-desc': 'modelYear-desc',
  'model-asc': 'modelYear-asc',
  'model-desc': 'modelYear-desc',
  'mileage-asc': 'odometer-asc',
  'mileage-desc': 'odometer-desc',
  // wayke.se v1 tokens, in case a dealer copied a link from there
  priceDefaultAsc: 'price-asc',
  priceDefaultDesc: 'price-desc',
  priceDefaultSortAsc: 'price-asc',
  priceDefaultSortDesc: 'price-desc',
  modelYearAsc: 'modelYear-asc',
  modelYearDesc: 'modelYear-desc',
  mileageAsc: 'odometer-asc',
  mileageDesc: 'odometer-desc',
  leasingDefaultSortAsc: 'leasing-asc',
  leasingDefaultSortDesc: 'leasing-desc',
  businessLeasingDefaultSortAsc: 'companyLeasing-asc',
  businessLeasingDefaultSortDesc: 'companyLeasing-desc',
};

const FUEL_TYPE_VALUE_ALIASES: Record<string, string> = {
  'Bensin/E85': 'E85+Bensin',
  'Bensin+E85': 'E85+Bensin',
  'Bensin+Etanol': 'E85+Bensin',
  'Bensin, El': 'Bensin+El',
  'El, Bensin': 'Bensin+El',
  'Diesel, Naturgas': 'Diesel+Naturgas',
  'El+Etanol': 'E85+El',
  Etanol: 'E85',
};

const DROPPED_KEYS = new Set(['hits', 'offset', 'campaign', 'priceType', 'qf', 'f']);

const LEGACY_PER_PAGE = 25;

const decodeBase64 = (value: string) => {
  try {
    return atob(value.replace(/-/g, '+').replace(/_/g, '/'));
  } catch (_e) {
    return undefined;
  }
};

/** Unpacks `qf`/`f`: a base64 query string, or base64 JSON whose `cars` is one. */
const unpackPacked = (value: string): URLSearchParams | undefined => {
  const decoded = decodeBase64(value);
  if (decoded === undefined) return undefined;
  try {
    const json = JSON.parse(decoded) as { cars?: string };
    if (json && typeof json === 'object' && typeof json.cars === 'string') {
      const inner = decodeBase64(json.cars);
      return new URLSearchParams(inner !== undefined ? inner : json.cars);
    }
  } catch (_e) {
    // not JSON: a plain packed query string
  }
  return new URLSearchParams(decoded);
};

/** True when the params carry anything that is not already in the new grammar. */
export const hasLegacyParams = (params: URLSearchParams) => {
  for (const [key, value] of params.entries()) {
    if (DROPPED_KEYS.has(key)) return true;
    if (key in SCALAR_ALIASES) return true;
    const base = key.replace(/\.(min|max)$/, '');
    if (base in RANGE_BASE_ALIASES) return true;
    if (key === 'sort' && value in SORT_ALIASES && SORT_ALIASES[value] !== value) return true;
  }
  return false;
};

/**
 * Legacy params → canonical new-grammar params. Idempotent: params already in
 * the new grammar come back unchanged (apart from canonical ordering).
 */
export const migrateLegacyParams = (input: URLSearchParams): URLSearchParams => {
  // 1. Unpack the packed forms and merge them with whatever is on the top level.
  const merged = new URLSearchParams();
  for (const packedKey of ['qf', 'f']) {
    const packed = input.get(packedKey);
    if (packed) {
      unpackPacked(packed)?.forEach((value, key) => merged.append(key, value));
    }
  }
  input.forEach((value, key) => {
    if (key !== 'qf' && key !== 'f') merged.append(key, value);
  });

  // 2. Rename keys and values.
  const out = new URLSearchParams();
  let page: number | undefined;
  merged.forEach((value, key) => {
    if (key === 'offset') {
      const offset = Number.parseInt(value, 10);
      if (Number.isFinite(offset) && offset > 0) {
        page = Math.floor(offset / LEGACY_PER_PAGE) + 1;
      }
      return;
    }
    if (DROPPED_KEYS.has(key)) return;

    if (key === 'sort') {
      const mapped = value in SORT_ALIASES ? SORT_ALIASES[value] : value;
      if (mapped) out.append('sort', mapped);
      return;
    }

    const rangeMatch = key.match(/^(.+)\.(min|max)$/);
    if (rangeMatch) {
      const base = RANGE_BASE_ALIASES[rangeMatch[1]] || rangeMatch[1];
      out.append(`${base}.${rangeMatch[2]}`, value);
      return;
    }

    const nextKey = SCALAR_ALIASES[key] || key;
    let nextValue = value;
    if (nextKey === 'fuelType' && value in FUEL_TYPE_VALUE_ALIASES) {
      nextValue = FUEL_TYPE_VALUE_ALIASES[value];
    }
    if (isKnownKey(nextKey)) out.append(nextKey, nextValue);
  });

  if (page !== undefined && page > 1 && !out.has('page')) out.set('page', String(page));
  return canonicalParams(out);
};
