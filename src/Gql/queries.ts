// GraphQL documents against the public API. Field selections are kept to what
// the components render; the schema is the source of truth (public-ads-docs).

export const SEARCH_HIT_FIELDS = `
  ad {
    id
    salesDescription { title }
    pricing {
      cash { price { amount } oldPrice { amount } deductibleVat }
      leasing { leasingMonthlyPayment { amount } }
      companyLeasing { leasingMonthlyPayment { amount } }
    }
    media(limit: 1) { items { ... on AdImage { id url formats { format url } } } }
    branch { id displayName }
    channels { ... on PlatformChannel { status soldAt } }
  }
  iteration {
    logistics { odometerReading { value unit } }
    item {
      ... on Vehicle {
        displayName
        manufacturer { stringValue }
        modelSeries { stringValue }
        modelYear { intValue }
        registrationNumber { stringValue }
        driveline { fuelTypesString { stringValue } }
        attributes { transmission { formattedValue } }
      }
    }
  }
`;

export const ADS_ARGUMENTS = `
  market: $market
  q: $q
  branchGroupId: $branchGroupId
  page: $page
  perPage: $perPage
  sort: $sort
  soldWithinDays: 0
  manufacturer: $manufacturer
  model: $model
  modelSeries: $modelSeries
  fuelType: $fuelType
  gearboxType: $gearboxType
  branchDisplayName: $branchDisplayName
  colorName: $colorName
  environmentClass: $environmentClass
  segment: $segment
  drivetrainType: $drivetrainType
  bodyStyle: $bodyStyle
  engineBaseType: $engineBaseType
  trimLevel: $trimLevel
  inventoryStatus: $inventoryStatus
  branchCity: $branchCity
  certifiedPreOwned: $certifiedPreOwned
  isDemoVersion: $isDemoVersion
  deductibleVat: $deductibleVat
  ecom: $ecom
  leasing: $leasing
  businessLeasing: $businessLeasing
  cashPriceMin: $cashPriceMin
  cashPriceMax: $cashPriceMax
  odometerReadingMin: $odometerReadingMin
  odometerReadingMax: $odometerReadingMax
  modelYearMin: $modelYearMin
  modelYearMax: $modelYearMax
  leasingPriceMin: $leasingPriceMin
  leasingPriceMax: $leasingPriceMax
  companyLeasingPriceMin: $companyLeasingPriceMin
  companyLeasingPriceMax: $companyLeasingPriceMax
`;

export const ADS_VARIABLE_DEFINITIONS = `
  $market: [String]
  $q: String
  $branchGroupId: String
  $page: Int
  $perPage: Int
  $sort: AdsSort
  $manufacturer: [String]
  $model: [String]
  $modelSeries: [String]
  $fuelType: [String]
  $gearboxType: [String]
  $branchDisplayName: [String]
  $colorName: [String]
  $environmentClass: [String]
  $segment: [String]
  $drivetrainType: [String]
  $bodyStyle: [String]
  $engineBaseType: [String]
  $trimLevel: [String]
  $inventoryStatus: [String]
  $branchCity: [String]
  $certifiedPreOwned: Boolean
  $isDemoVersion: Boolean
  $deductibleVat: Boolean
  $ecom: Boolean
  $leasing: Boolean
  $businessLeasing: Boolean
  $cashPriceMin: Float
  $cashPriceMax: Float
  $odometerReadingMin: Int
  $odometerReadingMax: Int
  $modelYearMin: Int
  $modelYearMax: Int
  $leasingPriceMin: Float
  $leasingPriceMax: Float
  $companyLeasingPriceMin: Float
  $companyLeasingPriceMax: Float
`;

/** Alias of the facet-only search for one selected list filter, see buildSearchQuery. */
export const multiSelectFacetAlias = (field: string) => `facets_${field}`;

/**
 * One request for the search page: the filtered list with its facets and, for
 * every list filter that has a selection, that facet counted WITHOUT its own
 * filter. The legacy search counted facets that way ("multi-select"), so the
 * other makes stay listed with their counts after picking one; the public API
 * counts facets on the filtered result, where only the picked make remains.
 */
export const buildSearchQuery = (selectedListFilters: string[]) => {
  const facetSearches = selectedListFilters
    .map((field) => {
      const args = ADS_ARGUMENTS.replace(`  ${field}: $${field}\n`, '').replace(
        'perPage: $perPage',
        'perPage: 0'
      );
      return `
    ${multiSelectFacetAlias(field)}: ads(${args}) @include(if: $withFacets) {
      facets { field counts { value count } }
    }`;
    })
    .join('');

  return `
query Search(
  ${ADS_VARIABLE_DEFINITIONS}
  $withFacets: Boolean!
) {
  search {
    ads(${ADS_ARGUMENTS}) {
      found
      page
      perPage
      hits { ${SEARCH_HIT_FIELDS} }
      facets @include(if: $withFacets) { field counts { value count } }
    }${facetSearches}
  }
}
`;
};

export const SEARCH_QUERY = buildSearchQuery([]);

/** Unfiltered facets and histograms: the filter panel's full value lists and slider domains. */
export const FACETS_QUERY = `
query SearchFacets($market: [String], $branchGroupId: String) {
  search {
    ads(market: $market, branchGroupId: $branchGroupId, perPage: 0, soldWithinDays: 0) {
      found
      facets { field counts { value count } }
      histograms {
        price { value count }
        odometerReading { value count }
        leasingPrice { value count }
        businessLeasingPrice { value count }
      }
    }
  }
}
`;

export const SUGGEST_QUERY = `
query Suggest($market: [String], $branchGroupId: String, $q: String!, $limit: Int) {
  search {
    ads(market: $market, branchGroupId: $branchGroupId, q: $q, perPage: 0, soldWithinDays: 0) {
      suggest(limit: $limit) { label count dimension filters { field value } }
    }
  }
}
`;
