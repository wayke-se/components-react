/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchItem
// ====================================================

export interface SearchItem_vehicle_branch {
  __typename: 'Branch';
  id: string | null;
  description: string | null;
}

export interface SearchItem_vehicle_properties {
  __typename: 'VehicleProperties';
  abs: boolean | null;
  acceleration: number | null;
  airbagDriver: boolean | null;
  airbagFrontSide: boolean | null;
  airbagPassenger: boolean | null;
  annualTax: number | null;
  annualBonus: number | null;
  annualMalus: number | null;
  brakeAssistance: boolean | null;
  chassis: string | null;
  co2: number | null;
  colorName: string | null;
  drivingWheel: string | null;
  engineCylinders: number | null;
  engineVolume: number | null;
  environmentClass: string | null;
  espSystem: boolean | null;
  fuelConsumptionCityDriving: number | null;
  fuelConsumptionCountryRoadDriving: number | null;
  fuelConsumptionMixedDriving: number | null;
  gearboxName: string | null;
  groundClearence: number | null;
  hasAutomaticGearbox: boolean | null;
  height: number | null;
  isofixRearSeat: boolean | null;
  length: number | null;
  listPrice: number | null;
  maxLoadWeight: number | null;
  maxRoofWeight: number | null;
  maxSpeed: number | null;
  ncapMonth: string | null;
  ncapStar: number | null;
  ncapYear: string | null;
  numberOfGears: number | null;
  seats: number | null;
  secondaryFuelType: string | null;
  segment: string | null;
  serviceWeight: number | null;
  tankVolume: number | null;
  tco3Years2500: number | null;
  tiresFront: string | null;
  tiresRear: string | null;
  torque: number | null;
  trailerTotalWeightB: number | null;
  trailerTotalWeightBPlus: number | null;
  trailerWeight: number | null;
  trcSystem: boolean | null;
  trunkSpace: number | null;
  wheelBase: number | null;
  width: number | null;
}

export interface SearchItem_vehicle {
  __typename: 'Vehicle';
  branch: SearchItem_vehicle_branch | null;
  description: string | null;
  id: string | null;
  gearbox: string | null;
  fuelType: string | null;
  manufactureYear: number | null;
  manufacturer: string | null;
  options: (string | null)[] | null;
  properties: SearchItem_vehicle_properties | null;
}

export interface SearchItem {
  vehicle: SearchItem_vehicle | null;
}

export interface SearchItemVariables {
  id?: string | null;
}
