/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { DrivingDistance } from './globalTypes';

// ====================================================
// GraphQL query operation: InsuranceCalculation
// ====================================================

export interface InsuranceCalculation_insurances_addons {
  __typename: 'InsuranceAddon';
  id: string;
  title: string | null;
  description: string | null;
  price: number;
  unit: string;
  exclusions: string[];
}

export interface InsuranceCalculation_insurances_items {
  __typename: 'InsuranceItem';
  name: string | null;
  description: string | null;
}

export interface InsuranceCalculation_insurances_legality {
  __typename: 'InsuranceLegality';
  description: string | null;
  url: string | null;
}

export interface InsuranceCalculation_insurances {
  __typename: 'Insurance';
  name: string;
  price: number;
  unit: string;
  description: string;
  logotype: string | null;
  addons: InsuranceCalculation_insurances_addons[];
  items: InsuranceCalculation_insurances_items[];
  legality: InsuranceCalculation_insurances_legality | null;
  terms: string | null;
  url: string | null;
}

export interface InsuranceCalculation {
  insurances: InsuranceCalculation_insurances[];
}

export interface InsuranceCalculationVariables {
  id: string;
  personalNumber: string;
  drivingDistance: DrivingDistance;
}
