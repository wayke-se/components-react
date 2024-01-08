export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never;
};
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: Date; output: Date };
  Email: { input: string; output: string };
  FileDocument: {
    input: { webp: string; category: string; contentType: string; name: string; url: string };
    output: { webp: string; category: string; contentType: string; name: string; url: string };
  };
  PersonalNumber: { input: string; output: string };
  PhoneNumber: { input: string; output: string };
  Time: { input: string; output: string };
  URL: { input: string; output: string };
  VehicleDataPropertyMap: {
    input: { [key: string]: string | number | boolean };
    output: { [key: string]: string | number | boolean };
  };
  VehicleDataPropertySet: { input: any; output: any };
};

export type Accessory = {
  __typename?: 'Accessory';
  articleNumber?: Maybe<Scalars['String']['output']>;
  assemblyPrice?: Maybe<Scalars['Float']['output']>;
  description: Scalars['String']['output'];
  excerpt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  images: Array<Scalars['String']['output']>;
  logotype?: Maybe<Scalars['String']['output']>;
  manufacturer?: Maybe<Scalars['String']['output']>;
  model?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  productPage?: Maybe<Link>;
  salePrice?: Maybe<Scalars['Float']['output']>;
};

export type Branch = {
  __typename?: 'Branch';
  connections: Array<BranchConnection>;
  contact?: Maybe<ContactOptions>;
  description?: Maybe<Scalars['String']['output']>;
  flags?: Maybe<BranchFlags>;
  homepage?: Maybe<Scalars['URL']['output']>;
  id: Scalars['ID']['output'];
  location?: Maybe<Location>;
  logotype?: Maybe<Scalars['URL']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  openingHours?: Maybe<OpeningHours>;
  organization?: Maybe<Organization>;
  promos: Array<Promo>;
  services: Array<Service>;
};

export type BranchConnection = {
  __typename?: 'BranchConnection';
  id: Scalars['ID']['output'];
  location?: Maybe<Location>;
  name?: Maybe<Scalars['String']['output']>;
};

export type BranchFlags = {
  __typename?: 'BranchFlags';
  authorizedReseller?: Maybe<Scalars['Boolean']['output']>;
  centralStorage?: Maybe<Scalars['Boolean']['output']>;
  ecommerce?: Maybe<Scalars['Boolean']['output']>;
  mrf?: Maybe<Scalars['Boolean']['output']>;
};

export type ContactOptions = {
  __typename?: 'ContactOptions';
  avatar?: Maybe<Scalars['URL']['output']>;
  email?: Maybe<Scalars['Email']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  phonenumber?: Maybe<Scalars['PhoneNumber']['output']>;
};

export enum DrivingDistance {
  Between0And1000 = 'BETWEEN0AND1000',
  Between1000And1500 = 'BETWEEN1000AND1500',
  Between1500And2000 = 'BETWEEN1500AND2000',
  Between2000And2500 = 'BETWEEN2000AND2500',
  Over2500 = 'OVER2500',
}

export type Ecommerce = {
  __typename?: 'Ecommerce';
  enabled?: Maybe<Scalars['Boolean']['output']>;
  reserved?: Maybe<Scalars['Boolean']['output']>;
  withHomeDelivery?: Maybe<Scalars['Boolean']['output']>;
  withTradeIn?: Maybe<Scalars['Boolean']['output']>;
};

export type FinancialOption = {
  __typename?: 'FinancialOption';
  administrationFee?: Maybe<Scalars['Float']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  downPayment?: Maybe<FinancialOptionDetail>;
  duration?: Maybe<FinancialOptionDetail>;
  effectiveInterest?: Maybe<Scalars['Float']['output']>;
  identifier?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['URL']['output']>;
  includes: Array<FinancialOptionInclusion>;
  interest?: Maybe<Scalars['Float']['output']>;
  link?: Maybe<Link>;
  loanAmount?: Maybe<Scalars['Float']['output']>;
  logotype?: Maybe<Scalars['URL']['output']>;
  mileage?: Maybe<FinancialOptionDetail>;
  monthlyCost?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  residual?: Maybe<FinancialOptionDetail>;
  setupFee?: Maybe<Scalars['Float']['output']>;
  terms?: Maybe<Scalars['URL']['output']>;
  totalCreditCost?: Maybe<Scalars['Float']['output']>;
  totalResidualValue?: Maybe<Scalars['Float']['output']>;
  type: Scalars['String']['output'];
  url?: Maybe<Scalars['URL']['output']>;
};

export type FinancialOptionDetail = {
  __typename?: 'FinancialOptionDetail';
  current: Scalars['Float']['output'];
  default: Scalars['Float']['output'];
  max: Scalars['Float']['output'];
  min: Scalars['Float']['output'];
  step: Scalars['Float']['output'];
};

export enum FinancialOptionInclusion {
  IncludesInsurance = 'INCLUDES_INSURANCE',
  IncludesService = 'INCLUDES_SERVICE',
  IncludesWintertires = 'INCLUDES_WINTERTIRES',
}

export type HoursOpen = {
  __typename?: 'HoursOpen';
  from?: Maybe<Scalars['Time']['output']>;
  until?: Maybe<Scalars['Time']['output']>;
};

export type Insurance = {
  __typename?: 'Insurance';
  addons: Array<InsuranceAddon>;
  description: Scalars['String']['output'];
  items: Array<InsuranceItem>;
  legality?: Maybe<InsuranceLegality>;
  logotype?: Maybe<Scalars['URL']['output']>;
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  terms?: Maybe<Scalars['URL']['output']>;
  unit: Scalars['String']['output'];
  url?: Maybe<Scalars['URL']['output']>;
};

export type InsuranceAddon = {
  __typename?: 'InsuranceAddon';
  description?: Maybe<Scalars['String']['output']>;
  exclusions: Array<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  price: Scalars['Float']['output'];
  title?: Maybe<Scalars['String']['output']>;
  unit: Scalars['String']['output'];
};

export type InsuranceItem = {
  __typename?: 'InsuranceItem';
  description?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type InsuranceLegality = {
  __typename?: 'InsuranceLegality';
  description?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['URL']['output']>;
};

export type InsuranceOption = {
  __typename?: 'InsuranceOption';
  description?: Maybe<Scalars['String']['output']>;
  identifier?: Maybe<Scalars['String']['output']>;
  institute?: Maybe<Scalars['String']['output']>;
  insuranceHeader?: Maybe<Scalars['String']['output']>;
  insuranceText?: Maybe<Scalars['String']['output']>;
  logotype?: Maybe<Scalars['URL']['output']>;
  longDescription?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  requiresDistance?: Maybe<Scalars['Boolean']['output']>;
  requiresPersonalNumber?: Maybe<Scalars['Boolean']['output']>;
  /** @deprecated No longer supported */
  terms?: Maybe<Scalars['URL']['output']>;
  url?: Maybe<Scalars['URL']['output']>;
};

export type Link = {
  __typename?: 'Link';
  title?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['URL']['output']>;
};

export type Location = {
  __typename?: 'Location';
  city?: Maybe<Scalars['String']['output']>;
  county?: Maybe<Scalars['String']['output']>;
  position?: Maybe<Position>;
  postalCode?: Maybe<Scalars['String']['output']>;
  streetAddress?: Maybe<Scalars['String']['output']>;
};

export type Manufacturer = {
  __typename?: 'Manufacturer';
  description?: Maybe<Scalars['String']['output']>;
  logotype?: Maybe<Scalars['URL']['output']>;
  name: Scalars['String']['output'];
  packageOption?: Maybe<PackageOption>;
};

export type Media = {
  __typename?: 'Media';
  files: Array<MediaFile>;
  type: Scalars['String']['output'];
};

export type MediaFile = {
  __typename?: 'MediaFile';
  formats: Array<Maybe<MediaFileFormat>>;
  url: Scalars['URL']['output'];
};

export type MediaFileFormat = {
  __typename?: 'MediaFileFormat';
  format: Scalars['String']['output'];
  url: Scalars['URL']['output'];
};

export type OdometerReading = {
  __typename?: 'OdometerReading';
  unit: Scalars['String']['output'];
  value: Scalars['Int']['output'];
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
  description?: Maybe<Scalars['String']['output']>;
  flags?: Maybe<BranchFlags>;
  homepage?: Maybe<Scalars['URL']['output']>;
  id: Scalars['ID']['output'];
  logotype?: Maybe<Scalars['URL']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<Branch>;
};

export type PackageOption = {
  __typename?: 'PackageOption';
  description?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['URL']['output']>;
  link?: Maybe<Link>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Position = {
  __typename?: 'Position';
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
};

export type Promo = {
  __typename?: 'Promo';
  description?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['URL']['output']>;
  link?: Maybe<Link>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  branch?: Maybe<Branch>;
  insurances: Array<Insurance>;
  loan?: Maybe<FinancialOption>;
  vehicle?: Maybe<Vehicle>;
};

export type QueryBranchArgs = {
  id: Scalars['ID']['input'];
};

export type QueryInsurancesArgs = {
  branch?: InputMaybe<Scalars['ID']['input']>;
  drivingDistance: DrivingDistance;
  id: Scalars['ID']['input'];
  personalNumber: Scalars['PersonalNumber']['input'];
};

export type QueryLoanArgs = {
  branch?: InputMaybe<Scalars['ID']['input']>;
  downPayment: Scalars['Int']['input'];
  duration: Scalars['Int']['input'];
  id: Scalars['ID']['input'];
  residual: Scalars['Float']['input'];
};

export type QueryVehicleArgs = {
  branch?: InputMaybe<Scalars['ID']['input']>;
  id: Scalars['ID']['input'];
};

export type SafetyOption = {
  __typename?: 'SafetyOption';
  content?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['URL']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Service = {
  __typename?: 'Service';
  markdown?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Vehicle = {
  __typename?: 'Vehicle';
  accessories: Array<Accessory>;
  availableFrom?: Maybe<Scalars['DateTime']['output']>;
  branch?: Maybe<Branch>;
  contact?: Maybe<ContactOptions>;
  data: VehicleData;
  description?: Maybe<Scalars['String']['output']>;
  discount?: Maybe<Scalars['Float']['output']>;
  documents: Array<Scalars['FileDocument']['output']>;
  ecommerce?: Maybe<Ecommerce>;
  financialOptions: Array<FinancialOption>;
  flags?: Maybe<VehicleFlags>;
  id: Scalars['ID']['output'];
  insuranceOptions: Array<InsuranceOption>;
  location?: Maybe<Location>;
  manufacturer?: Maybe<Manufacturer>;
  media: Array<Media>;
  packageOptions: Array<PackageOption>;
  price: Scalars['Float']['output'];
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  safety: Array<SafetyOption>;
  shortDescription?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};

export type VehicleData = {
  __typename?: 'VehicleData';
  enginePower?: Maybe<Scalars['Float']['output']>;
  equipmentLevel?: Maybe<Scalars['String']['output']>;
  fuelType?: Maybe<Scalars['String']['output']>;
  gearbox?: Maybe<Scalars['String']['output']>;
  gearboxType?: Maybe<Scalars['String']['output']>;
  manufactureYear: Scalars['Int']['output'];
  manufacturer: Scalars['String']['output'];
  mileage: Scalars['Int']['output'];
  modelName?: Maybe<Scalars['String']['output']>;
  modelSeries?: Maybe<Scalars['String']['output']>;
  modelYear: Scalars['Int']['output'];
  odometerReading?: Maybe<OdometerReading>;
  options: Array<Scalars['String']['output']>;
  properties?: Maybe<Scalars['VehicleDataPropertyMap']['output']>;
  propertySet?: Maybe<Scalars['VehicleDataPropertySet']['output']>;
  registrationNumber?: Maybe<Scalars['String']['output']>;
  salesName?: Maybe<Scalars['String']['output']>;
  vin?: Maybe<Scalars['String']['output']>;
};

export type VehicleDataPropertySetArgs = {
  category?: InputMaybe<Scalars['String']['input']>;
  properties?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type VehicleFlags = {
  __typename?: 'VehicleFlags';
  auction?: Maybe<Scalars['Boolean']['output']>;
  demoVersion?: Maybe<Scalars['Boolean']['output']>;
  testDrive?: Maybe<Scalars['Boolean']['output']>;
};

export type _Service = {
  __typename?: '_Service';
  sdl: Scalars['String']['output'];
};
