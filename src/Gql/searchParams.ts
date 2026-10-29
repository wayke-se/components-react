// The search URL grammar on /sok, shared with web-ui-v2 so that saved links
// behave the same on wayke.se and on a dealer site: plain query string, one
// key per filter, `.min`/`.max` for ranges, `sort=<key>` and `page=<n>`.
// Everything here is the browser-side translation of that grammar into the
// arguments of `search.ads`.

import { MarketCode } from '../@types/market';

export const FREE_TEXT = 'q';
export const SORT = 'sort';
export const PAGE = 'page';

/** Facet filters whose URL key, facet field and search argument share a name. */
export const LIST_FILTERS = [
  'manufacturer',
  'model',
  'modelSeries',
  'fuelType',
  'gearboxType',
  'branchDisplayName',
  'colorName',
  'environmentClass',
  'segment',
  'drivetrainType',
  'bodyStyle',
  'engineBaseType',
  'trimLevel',
  'inventoryStatus',
  'branchCity',
] as const;
export type ListFilter = (typeof LIST_FILTERS)[number];

/** Range filters: URL base key → the `…Min`/`…Max` argument pair. */
export const RANGE_FILTERS = {
  price: 'cashPrice',
  odometer: 'odometerReading',
  modelYear: 'modelYear',
  privateLease: 'leasingPrice',
  businessLease: 'companyLeasingPrice',
} as const;
export type RangeFilter = keyof typeof RANGE_FILTERS;

export const BOOLEAN_FILTERS = [
  'certifiedPreOwned',
  'isDemoVersion',
  'deductibleVat',
  'ecom',
  'leasing',
  'businessLeasing',
] as const;

export interface SortDefinition {
  field: string;
  direction: 'asc' | 'desc';
  /** Legacy token the sort panel translates; see Utils/SortOptions.ts. */
  legacyName: string;
}

/** `sort=` keys, in the order the sort panel lists them. The first is the default. */
export const SORT_OPTIONS: Record<string, SortDefinition> = {
  'published-desc': { field: 'publishedAt', direction: 'desc', legacyName: 'published-desc' },
  'published-asc': { field: 'publishedAt', direction: 'asc', legacyName: 'published-asc' },
  'price-asc': { field: 'price', direction: 'asc', legacyName: 'price-asc' },
  'price-desc': { field: 'price', direction: 'desc', legacyName: 'price-desc' },
  'modelYear-desc': { field: 'modelYear', direction: 'desc', legacyName: 'model-desc' },
  'modelYear-asc': { field: 'modelYear', direction: 'asc', legacyName: 'model-asc' },
  'odometer-asc': { field: 'odometerReading', direction: 'asc', legacyName: 'mileage-asc' },
  'odometer-desc': { field: 'odometerReading', direction: 'desc', legacyName: 'mileage-desc' },
  'leasing-asc': { field: 'leasingPrice', direction: 'asc', legacyName: 'leasing-asc' },
  'leasing-desc': { field: 'leasingPrice', direction: 'desc', legacyName: 'leasing-desc' },
  'companyLeasing-asc': {
    field: 'companyLeasingPrice',
    direction: 'asc',
    legacyName: 'companyLeasing-asc',
  },
  'companyLeasing-desc': {
    field: 'companyLeasingPrice',
    direction: 'desc',
    legacyName: 'companyLeasing-desc',
  },
};
export const DEFAULT_SORT = 'published-desc';

/** Page size as components-react's legacy search had it: 30, also after a filter. */
export const pageSize = (_params: URLSearchParams) => 30;

const KNOWN_KEYS = new Set<string>([
  FREE_TEXT,
  SORT,
  PAGE,
  ...LIST_FILTERS,
  ...BOOLEAN_FILTERS,
  ...Object.keys(RANGE_FILTERS).flatMap((k) => [`${k}.min`, `${k}.max`]),
]);

export const isKnownKey = (key: string) => KNOWN_KEYS.has(key);

/** Odometer values in the URL are in the market's display unit; the API takes km. */
export const kmPerOdometerUnit = (market: MarketCode) => (market === 'NO' ? 1 : 10);

const toInt = (value: string | null) => {
  if (value === null || value === '') return undefined;
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) ? n : undefined;
};

export interface AdsVariables {
  market: string[];
  q?: string;
  page: number;
  perPage: number;
  sort?: { field: string; direction: 'asc' | 'desc' };
  [key: string]: unknown;
}

/**
 * URL params → `search.ads` variables. Unknown keys are ignored; the page is read
 * from `page` unless given explicitly (load more passes it).
 */
export const toSearchVariables = (
  params: URLSearchParams,
  market: MarketCode,
  options?: { page?: number; perPage?: number }
): AdsVariables => {
  const variables: AdsVariables = {
    market: [market],
    page: options?.page ?? toInt(params.get(PAGE)) ?? 1,
    perPage: options?.perPage ?? pageSize(params),
  };

  const q = params.get(FREE_TEXT)?.trim();
  if (q) variables.q = q;

  LIST_FILTERS.forEach((key) => {
    const values = params.getAll(key).filter(Boolean);
    if (values.length) variables[key] = values;
  });

  BOOLEAN_FILTERS.forEach((key) => {
    if (params.get(key) === 'true') variables[key] = true;
  });

  (Object.keys(RANGE_FILTERS) as RangeFilter[]).forEach((key) => {
    const scale = key === 'odometer' ? kmPerOdometerUnit(market) : 1;
    const min = toInt(params.get(`${key}.min`));
    const max = toInt(params.get(`${key}.max`));
    if (min !== undefined) variables[`${RANGE_FILTERS[key]}Min`] = min * scale;
    if (max !== undefined) variables[`${RANGE_FILTERS[key]}Max`] = max * scale;
  });

  const sort = SORT_OPTIONS[params.get(SORT) || ''];
  if (sort) variables.sort = { field: sort.field, direction: sort.direction };

  return variables;
};

/** The canonical form written to the address bar: known keys only, sorted, no paging. */
export const canonicalParams = (params: URLSearchParams) => {
  const next = new URLSearchParams();
  params.forEach((value, key) => {
    if (!isKnownKey(key) || key === PAGE) return;
    if (key === SORT && (value === DEFAULT_SORT || !SORT_OPTIONS[value])) return;
    if (value === '') return;
    next.append(key, value);
  });
  next.sort();
  return next;
};

export const toggleListValue = (params: URLSearchParams, key: string, value: string) => {
  const next = new URLSearchParams(params);
  const current = next.getAll(key);
  next.delete(key);
  if (current.includes(value)) {
    current.filter((v) => v !== value).forEach((v) => next.append(key, v));
  } else {
    [...current, value].forEach((v) => next.append(key, v));
  }
  return canonicalParams(next);
};

export const withSort = (params: URLSearchParams, sortKey: string) => {
  const next = new URLSearchParams(params);
  next.set(SORT, sortKey);
  return canonicalParams(next);
};

export const withPage = (params: URLSearchParams, page: number) => {
  const next = new URLSearchParams(params);
  next.set(PAGE, String(page));
  return next;
};
