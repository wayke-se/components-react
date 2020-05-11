/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: VehicleQuery
// ====================================================

export interface VehicleQuery_vehicle {
  __typename: "Vehicle";
  description: string | null;
}

export interface VehicleQuery {
  vehicle: VehicleQuery_vehicle | null;
}

export interface VehicleQueryVariables {
  id?: string | null;
}
