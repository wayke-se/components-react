// Response shapes for the documents in queries.ts.

export interface Money {
  amount: string;
}

export interface AdImageFormat {
  format: string;
  url: string;
}

export interface SearchHit {
  ad: {
    id: string;
    salesDescription: { title: string } | null;
    pricing: {
      cash: { price: Money; oldPrice: Money | null; deductibleVat: boolean } | null;
      leasing: { leasingMonthlyPayment: Money | null } | null;
      companyLeasing: { leasingMonthlyPayment: Money | null } | null;
    } | null;
    media: { items: ({ id?: string; url?: string; formats?: AdImageFormat[] } | null)[] };
    branch: { id: string; displayName: string | null };
    channels: ({ status?: string; soldAt?: string | null } | null)[];
  };
  iteration: {
    logistics: {
      odometerReading: { value: number; unit: 'KILOMETER' | 'SCANDINAVIAN_MILE' } | null;
    } | null;
    item: {
      displayName?: string;
      manufacturer?: { stringValue: string } | null;
      modelSeries?: { stringValue: string } | null;
      modelYear?: { intValue: number } | null;
      registrationNumber?: { stringValue: string } | null;
      driveline?: { fuelTypesString: { stringValue: string } | null } | null;
      attributes?: { transmission: { formattedValue: string } | null } | null;
    } | null;
  } | null;
}

export interface FacetCount {
  value: string;
  count: number;
}

export interface Facet {
  field: string;
  counts: FacetCount[];
}

export interface HistogramBucket {
  value: number;
  count: number;
}

export interface AdsResult {
  found: number;
  page: number;
  perPage: number;
  hits: SearchHit[];
  facets?: Facet[] | null;
  histograms?: {
    price: HistogramBucket[];
    odometerReading: HistogramBucket[];
    leasingPrice: HistogramBucket[];
    businessLeasingPrice: HistogramBucket[];
  } | null;
}

export interface Suggestion {
  label: string;
  count: number;
  dimension: string;
  filters: { field: string; value: string }[];
}

export interface SearchData {
  search: {
    ads: AdsResult | null;
    /** facets_<field>: that facet counted without its own filter */
    [alias: string]: { facets?: Facet[] | null } | AdsResult | null | undefined;
  } | null;
}

export interface FacetsData {
  search: { ads: AdsResult | null } | null;
}

export interface SuggestData {
  search: { ads: { suggest: Suggestion[] } | null } | null;
}
