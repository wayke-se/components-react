/** The filters the panel can show, named as their URL keys (see Gql/searchParams.ts). */
export type SearchFilterNameTypes =
  | 'manufacturer'
  | 'model'
  | 'modelSeries'
  | 'fuelType'
  | 'gearboxType'
  | 'branchDisplayName'
  | 'branchCity'
  | 'colorName'
  | 'environmentClass'
  | 'segment'
  | 'bodyStyle'
  | 'trimLevel'
  | 'inventoryStatus'
  | 'drivetrainType'
  | 'engineBaseType'
  | 'price'
  | 'odometer'
  | 'modelYear'
  | 'privateLease'
  | 'businessLease';

export type SearchFilterTypes = {
  filterName: SearchFilterNameTypes;
  displayName?: string;
};

/** Filter names from before 6.0 → their name now. */
export const LEGACY_FILTER_NAMES: Record<string, SearchFilterNameTypes> = {
  branch: 'branchDisplayName',
  color: 'colorName',
  'properties.segment': 'segment',
  drivingWheel: 'drivetrainType',
  mileage: 'odometer',
  odometerValueAsKm: 'odometer',
  leasingPrice: 'privateLease',
  businessLeasingPrice: 'businessLease',
};

export const DEFAULT_FILTER_LIST: SearchFilterTypes[] = [
  { filterName: 'manufacturer' },
  { filterName: 'modelSeries' },
  { filterName: 'fuelType' },
  { filterName: 'gearboxType' },
  { filterName: 'branchDisplayName' },
  { filterName: 'colorName' },
  { filterName: 'environmentClass' },
  { filterName: 'segment' },
  { filterName: 'drivetrainType' },
  { filterName: 'price' },
  { filterName: 'privateLease' },
  { filterName: 'businessLease' },
  { filterName: 'odometer' },
  { filterName: 'modelYear' },
];

/** The filter list with old names translated and duplicates (mileage + odometerValueAsKm) dropped. */
export const resolveFilterList = (filterList?: SearchFilterTypes[]): SearchFilterTypes[] => {
  if (!filterList) return DEFAULT_FILTER_LIST;
  const legacy = filterList.filter((f) => f.filterName in LEGACY_FILTER_NAMES);
  if (legacy.length) {
    // biome-ignore lint/suspicious/noConsole: tells the site's developer what to change
    console.warn(
      `Wayke: filterList uses filter names from before 6.0 (${legacy
        .map((f) => f.filterName)
        .join(', ')}); they are translated, see the README for the new names`
    );
  }
  const seen = new Set<string>();
  return filterList
    .map((f) => ({ ...f, filterName: LEGACY_FILTER_NAMES[f.filterName] || f.filterName }))
    .filter((f) => {
      if (seen.has(f.filterName)) return false;
      seen.add(f.filterName);
      return true;
    });
};
