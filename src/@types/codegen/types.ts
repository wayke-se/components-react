export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: Date;
  Email: string;
  FileDocument: {contentType: string, name: string, url: string};
  PersonalNumber: string;
  PhoneNumber: string;
  Time: string;
  URL: string;
  VehicleDataPropertyMap: { [key: string]: string | number | boolean };
  VehicleDataPropertySet: any;
};

export type Branch = {
  __typename?: 'Branch';
  connections: Array<BranchConnection>;
  contact?: Maybe<ContactOptions>;
  description?: Maybe<Scalars['String']>;
  flags?: Maybe<BranchFlags>;
  homepage?: Maybe<Scalars['URL']>;
  id: Scalars['ID'];
  location?: Maybe<Location>;
  logotype?: Maybe<Scalars['URL']>;
  name?: Maybe<Scalars['String']>;
  openingHours?: Maybe<OpeningHours>;
  organization?: Maybe<Organization>;
  promos: Array<Promo>;
  services: Array<Service>;
};

export type BranchConnection = {
  __typename?: 'BranchConnection';
  id: Scalars['ID'];
  location?: Maybe<Location>;
  name?: Maybe<Scalars['String']>;
};

export type BranchFlags = {
  __typename?: 'BranchFlags';
  centralStorage?: Maybe<Scalars['Boolean']>;
  ecommerce?: Maybe<Scalars['Boolean']>;
  mrf?: Maybe<Scalars['Boolean']>;
};

export type ContactOptions = {
  __typename?: 'ContactOptions';
  avatar?: Maybe<Scalars['URL']>;
  email?: Maybe<Scalars['Email']>;
  name?: Maybe<Scalars['String']>;
  phonenumber?: Maybe<Scalars['PhoneNumber']>;
};

export enum DrivingDistance {
  Between0And1000 = 'BETWEEN0AND1000',
  Between1000And1500 = 'BETWEEN1000AND1500',
  Between1500And2000 = 'BETWEEN1500AND2000',
  Between2000And2500 = 'BETWEEN2000AND2500',
  Over2500 = 'OVER2500'
}

export type Ecommerce = {
  __typename?: 'Ecommerce';
  enabled?: Maybe<Scalars['Boolean']>;
  reserved?: Maybe<Scalars['Boolean']>;
  withHomeDelivery?: Maybe<Scalars['Boolean']>;
  withTradeIn?: Maybe<Scalars['Boolean']>;
};

export type FinancialOption = {
  __typename?: 'FinancialOption';
  administrationFee?: Maybe<Scalars['Float']>;
  description?: Maybe<Scalars['String']>;
  downPayment?: Maybe<FinancialOptionDetail>;
  duration?: Maybe<FinancialOptionDetail>;
  effectiveInterest?: Maybe<Scalars['Float']>;
  identifier?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['URL']>;
  includes: Array<FinancialOptionInclusion>;
  interest?: Maybe<Scalars['Float']>;
  link?: Maybe<Link>;
  loanAmount?: Maybe<Scalars['Float']>;
  logotype?: Maybe<Scalars['URL']>;
  mileage?: Maybe<FinancialOptionDetail>;
  monthlyCost?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
  residual?: Maybe<FinancialOptionDetail>;
  setupFee?: Maybe<Scalars['Float']>;
  terms?: Maybe<Scalars['URL']>;
  totalCreditCost?: Maybe<Scalars['Float']>;
  totalResidualValue?: Maybe<Scalars['Float']>;
  type: Scalars['String'];
  url?: Maybe<Scalars['URL']>;
};

export type FinancialOptionDetail = {
  __typename?: 'FinancialOptionDetail';
  current: Scalars['Float'];
  default: Scalars['Float'];
  max: Scalars['Float'];
  min: Scalars['Float'];
  step: Scalars['Float'];
};

export enum FinancialOptionInclusion {
  IncludesInsurance = 'INCLUDES_INSURANCE',
  IncludesService = 'INCLUDES_SERVICE',
  IncludesWintertires = 'INCLUDES_WINTERTIRES'
}

export type HoursOpen = {
  __typename?: 'HoursOpen';
  from?: Maybe<Scalars['Time']>;
  until?: Maybe<Scalars['Time']>;
};

export type Insurance = {
  __typename?: 'Insurance';
  addons: Array<InsuranceAddon>;
  description: Scalars['String'];
  items: Array<InsuranceItem>;
  legality?: Maybe<InsuranceLegality>;
  logotype?: Maybe<Scalars['URL']>;
  name: Scalars['String'];
  price: Scalars['Float'];
  terms?: Maybe<Scalars['URL']>;
  unit: Scalars['String'];
  url?: Maybe<Scalars['URL']>;
};

export type InsuranceAddon = {
  __typename?: 'InsuranceAddon';
  description?: Maybe<Scalars['String']>;
  exclusions: Array<Scalars['String']>;
  id: Scalars['ID'];
  price: Scalars['Float'];
  title?: Maybe<Scalars['String']>;
  unit: Scalars['String'];
};

export type InsuranceItem = {
  __typename?: 'InsuranceItem';
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type InsuranceLegality = {
  __typename?: 'InsuranceLegality';
  description?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['URL']>;
};

export type InsuranceOption = {
  __typename?: 'InsuranceOption';
  description?: Maybe<Scalars['String']>;
  identifier?: Maybe<Scalars['String']>;
  institute?: Maybe<Scalars['String']>;
  insuranceText?: Maybe<Scalars['String']>;
  logotype?: Maybe<Scalars['URL']>;
  longDescription?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  requiresDistance?: Maybe<Scalars['Boolean']>;
  requiresPersonalNumber?: Maybe<Scalars['Boolean']>;
  /** @deprecated No longer supported */
  terms?: Maybe<Scalars['URL']>;
  url?: Maybe<Scalars['URL']>;
};

export type Link = {
  __typename?: 'Link';
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['URL']>;
};

export type Location = {
  __typename?: 'Location';
  city?: Maybe<Scalars['String']>;
  county?: Maybe<Scalars['String']>;
  position?: Maybe<Position>;
  postalCode?: Maybe<Scalars['String']>;
  streetAddress?: Maybe<Scalars['String']>;
};

export type Manufacturer = {
  __typename?: 'Manufacturer';
  description?: Maybe<Scalars['String']>;
  logotype?: Maybe<Scalars['URL']>;
  name: Scalars['String'];
  packageOption?: Maybe<PackageOption>;
};

export type Media = {
  __typename?: 'Media';
  files: Array<MediaFile>;
  type: Scalars['String'];
};

export type MediaFile = {
  __typename?: 'MediaFile';
  formats: Array<Maybe<MediaFileFormat>>;
  url: Scalars['URL'];
};

export type MediaFileFormat = {
  __typename?: 'MediaFileFormat';
  format: Scalars['String'];
  url: Scalars['URL'];
};

export type OpeningHours = {
  __typename?: 'OpeningHours';
  friday?: Maybe<HoursOpen>;
  monday?: Maybe<HoursOpen>;
  saturday?: Maybe<HoursOpen>;
  sunday?: Maybe<HoursOpen>;
  thursday?: Maybe<HoursOpen>;
  tuesday?: Maybe<HoursOpen>;
  wednesday?: Maybe<HoursOpen>;
};

export type Organization = {
  __typename?: 'Organization';
  branches: Array<Maybe<Branch>>;
  contact?: Maybe<ContactOptions>;
  description?: Maybe<Scalars['String']>;
  flags?: Maybe<BranchFlags>;
  homepage?: Maybe<Scalars['URL']>;
  id: Scalars['ID'];
  logotype?: Maybe<Scalars['URL']>;
  name?: Maybe<Scalars['String']>;
  parent?: Maybe<Branch>;
};

export type PackageOption = {
  __typename?: 'PackageOption';
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['URL']>;
  link?: Maybe<Link>;
  title?: Maybe<Scalars['String']>;
};

export type Position = {
  __typename?: 'Position';
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
};

export type Promo = {
  __typename?: 'Promo';
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['URL']>;
  link?: Maybe<Link>;
  title?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  branch?: Maybe<Branch>;
  insurances: Array<Insurance>;
  loan?: Maybe<FinancialOption>;
  vehicle?: Maybe<Vehicle>;
};


export type QueryBranchArgs = {
  id: Scalars['ID'];
};


export type QueryInsurancesArgs = {
  branch?: InputMaybe<Scalars['ID']>;
  drivingDistance: DrivingDistance;
  id: Scalars['ID'];
  personalNumber: Scalars['PersonalNumber'];
};


export type QueryLoanArgs = {
  branch?: InputMaybe<Scalars['ID']>;
  downPayment: Scalars['Int'];
  duration: Scalars['Int'];
  id: Scalars['ID'];
  residual: Scalars['Float'];
};


export type QueryVehicleArgs = {
  branch?: InputMaybe<Scalars['ID']>;
  id: Scalars['ID'];
};

export type SafetyOption = {
  __typename?: 'SafetyOption';
  content?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['URL']>;
  name?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type Service = {
  __typename?: 'Service';
  markdown?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type Vehicle = {
  __typename?: 'Vehicle';
  branch?: Maybe<Branch>;
  contact?: Maybe<ContactOptions>;
  data: VehicleData;
  description?: Maybe<Scalars['String']>;
  discount?: Maybe<Scalars['Float']>;
  documents: Array<Scalars['FileDocument']>;
  ecommerce?: Maybe<Ecommerce>;
  financialOptions: Array<FinancialOption>;
  flags?: Maybe<VehicleFlags>;
  id: Scalars['ID'];
  insuranceOptions: Array<InsuranceOption>;
  location?: Maybe<Location>;
  manufacturer?: Maybe<Manufacturer>;
  media: Array<Media>;
  packageOptions: Array<PackageOption>;
  price: Scalars['Float'];
  publishedAt?: Maybe<Scalars['DateTime']>;
  safety: Array<SafetyOption>;
  shortDescription?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};

export type VehicleData = {
  __typename?: 'VehicleData';
  enginePower?: Maybe<Scalars['Float']>;
  equipmentLevel?: Maybe<Scalars['String']>;
  fuelType?: Maybe<Scalars['String']>;
  gearbox?: Maybe<Scalars['String']>;
  gearboxType?: Maybe<Scalars['String']>;
  manufactureYear: Scalars['Int'];
  manufacturer: Scalars['String'];
  mileage: Scalars['Int'];
  modelName?: Maybe<Scalars['String']>;
  modelSeries?: Maybe<Scalars['String']>;
  modelYear: Scalars['Int'];
  options: Array<Scalars['String']>;
  properties?: Maybe<Scalars['VehicleDataPropertyMap']>;
  propertySet?: Maybe<Scalars['VehicleDataPropertySet']>;
  registrationNumber?: Maybe<Scalars['String']>;
  salesName?: Maybe<Scalars['String']>;
  vin?: Maybe<Scalars['String']>;
};


export type VehicleDataPropertySetArgs = {
  category?: InputMaybe<Scalars['String']>;
  properties?: InputMaybe<Array<Scalars['String']>>;
};

export type VehicleFlags = {
  __typename?: 'VehicleFlags';
  auction?: Maybe<Scalars['Boolean']>;
  testDrive?: Maybe<Scalars['Boolean']>;
};
