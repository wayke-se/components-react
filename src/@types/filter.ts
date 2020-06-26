export type SearchFilterNameTypes =
  | 'manufacturer'
  | 'modelSeries'
  | 'fuelType'
  | 'gearboxType'
  | 'branch'
  | 'color'
  | 'environmentClass'
  | 'properties.segment'
  | 'drivingWheel'
  | 'price'
  | 'mileage'
  | 'modelYear';

export type SearchFilterTypes = {
  filterName: SearchFilterNameTypes;
  displayName?: string;
};
