/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchItem
// ====================================================

export interface SearchItem_vehicle_contact {
  __typename: "ContactOptions";
  name: string | null;
  email: string | null;
  phonenumber: string | null;
}

export interface SearchItem_vehicle_branch_flags {
  __typename: "BranchFlags";
  mrf: boolean | null;
  centralStorage: boolean | null;
  ecommerce: boolean | null;
}

export interface SearchItem_vehicle_branch_openingHours_monday {
  __typename: "HoursOpen";
  from: string;
  until: string;
}

export interface SearchItem_vehicle_branch_openingHours_tuesday {
  __typename: "HoursOpen";
  from: string;
  until: string;
}

export interface SearchItem_vehicle_branch_openingHours_wednesday {
  __typename: "HoursOpen";
  from: string;
  until: string;
}

export interface SearchItem_vehicle_branch_openingHours_thursday {
  __typename: "HoursOpen";
  from: string;
  until: string;
}

export interface SearchItem_vehicle_branch_openingHours_friday {
  __typename: "HoursOpen";
  from: string;
  until: string;
}

export interface SearchItem_vehicle_branch_openingHours_saturday {
  __typename: "HoursOpen";
  from: string;
  until: string;
}

export interface SearchItem_vehicle_branch_openingHours_sunday {
  __typename: "HoursOpen";
  from: string;
  until: string;
}

export interface SearchItem_vehicle_branch_openingHours {
  __typename: "OpeningHours";
  monday: SearchItem_vehicle_branch_openingHours_monday | null;
  tuesday: SearchItem_vehicle_branch_openingHours_tuesday | null;
  wednesday: SearchItem_vehicle_branch_openingHours_wednesday | null;
  thursday: SearchItem_vehicle_branch_openingHours_thursday | null;
  friday: SearchItem_vehicle_branch_openingHours_friday | null;
  saturday: SearchItem_vehicle_branch_openingHours_saturday | null;
  sunday: SearchItem_vehicle_branch_openingHours_sunday | null;
}

export interface SearchItem_vehicle_branch_organization_branches {
  __typename: "Branch";
  id: string;
}

export interface SearchItem_vehicle_branch_organization_parent {
  __typename: "Branch";
  id: string;
}

export interface SearchItem_vehicle_branch_organization {
  __typename: "Organization";
  branches: (SearchItem_vehicle_branch_organization_branches | null)[];
  parent: SearchItem_vehicle_branch_organization_parent | null;
}

export interface SearchItem_vehicle_branch_location {
  __typename: "Location";
  city: string | null;
  county: string | null;
  streetAddress: string | null;
  postalCode: string | null;
}

export interface SearchItem_vehicle_branch_promos {
  __typename: "Promo";
  description: string | null;
  image: string | null;
  title: string | null;
}

export interface SearchItem_vehicle_branch_services {
  __typename: "Service";
  markdown: string | null;
  title: string | null;
}

export interface SearchItem_vehicle_branch {
  __typename: "Branch";
  id: string;
  description: string | null;
  name: string | null;
  homepage: string | null;
  flags: SearchItem_vehicle_branch_flags | null;
  logotype: string | null;
  openingHours: SearchItem_vehicle_branch_openingHours | null;
  organization: SearchItem_vehicle_branch_organization | null;
  location: SearchItem_vehicle_branch_location | null;
  promos: (SearchItem_vehicle_branch_promos | null)[];
  services: (SearchItem_vehicle_branch_services | null)[];
}

export interface SearchItem_vehicle_data {
  __typename: "VehicleData";
  enginePower: number | null;
  equipmentLevel: string | null;
  fuelType: string | null;
  gearbox: string | null;
  gearboxType: string | null;
  manufactureYear: number;
  manufacturer: string;
  mileage: number;
  modelName: string | null;
  modelSeries: string | null;
  modelYear: number;
  properties: any | null;
  options: string[];
  registrationNumber: string | null;
  salesName: string | null;
  vin: string | null;
}

export interface SearchItem_vehicle_ecommerce {
  __typename: "Ecommerce";
  enabled: boolean | null;
  reserved: boolean | null;
  withTradeIn: boolean | null;
  withHomeDelivery: boolean | null;
}

export interface SearchItem_vehicle_insuranceOptions {
  __typename: "InsuranceOption";
  description: string | null;
  logotype: string | null;
  url: string | null;
}

export interface SearchItem_vehicle_financialOptions_downPayment {
  __typename: "FinancialOptionDetail";
  current: number;
  default: number;
  max: number;
  min: number;
  step: number;
}

export interface SearchItem_vehicle_financialOptions_duration {
  __typename: "FinancialOptionDetail";
  current: number;
  default: number;
  max: number;
  min: number;
  step: number;
}

export interface SearchItem_vehicle_financialOptions_link {
  __typename: "Link";
  title: string | null;
  href: string | null;
}

export interface SearchItem_vehicle_financialOptions_residual {
  __typename: "FinancialOptionDetail";
  current: number;
  default: number;
  max: number;
  min: number;
  step: number;
}

export interface SearchItem_vehicle_financialOptions {
  __typename: "FinancialOption";
  administrationFee: number | null;
  downPayment: SearchItem_vehicle_financialOptions_downPayment | null;
  duration: SearchItem_vehicle_financialOptions_duration | null;
  effectiveInterest: number | null;
  image: string | null;
  interest: number | null;
  link: SearchItem_vehicle_financialOptions_link | null;
  loanAmount: number | null;
  logotype: string | null;
  monthlyCost: number | null;
  name: string | null;
  residual: SearchItem_vehicle_financialOptions_residual | null;
  setupFee: number | null;
  totalCreditCost: number | null;
  type: string;
}

export interface SearchItem_vehicle_media_formats {
  __typename: "MediaFileFormat";
  format: string | null;
  url: string | null;
}

export interface SearchItem_vehicle_media {
  __typename: "MediaFile";
  url: string | null;
  type: string;
  formats: (SearchItem_vehicle_media_formats | null)[];
}

export interface SearchItem_vehicle_location {
  __typename: "Location";
  city: string | null;
  county: string | null;
  streetAddress: string | null;
  postalCode: string | null;
}

export interface SearchItem_vehicle {
  __typename: "Vehicle";
  id: string;
  contact: SearchItem_vehicle_contact | null;
  branch: SearchItem_vehicle_branch | null;
  data: SearchItem_vehicle_data;
  description: string | null;
  ecommerce: SearchItem_vehicle_ecommerce | null;
  insuranceOptions: SearchItem_vehicle_insuranceOptions[];
  financialOptions: SearchItem_vehicle_financialOptions[];
  media: (SearchItem_vehicle_media | null)[];
  location: SearchItem_vehicle_location | null;
  price: number;
  shortDescription: string | null;
  title: string;
}

export interface SearchItem {
  vehicle: SearchItem_vehicle | null;
}

export interface SearchItemVariables {
  id: string;
}
