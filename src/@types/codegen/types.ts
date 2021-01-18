export type Maybe<T> = T | null;
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
  PersonalNumber: string;
  PhoneNumber: string;
  Time: string;
  URL: string;
  VehicleDataPropertyMap: { [key: string]: string | number | boolean };
  VehicleDataPropertySet: any;
};

export type Branch = {
  __typename?: 'Branch';
  id: Scalars['ID'];
  description?: Maybe<Scalars['String']>;
  flags?: Maybe<BranchFlags>;
  name?: Maybe<Scalars['String']>;
  contact?: Maybe<ContactOptions>;
  homepage?: Maybe<Scalars['URL']>;
  logotype?: Maybe<Scalars['URL']>;
  openingHours?: Maybe<OpeningHours>;
  organization?: Maybe<Organization>;
  location?: Maybe<Location>;
  promos: Array<Promo>;
  services: Array<Service>;
  connections: Array<BranchConnection>;
};

export type BranchConnection = {
  __typename?: 'BranchConnection';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  location?: Maybe<Location>;
};

export type BranchFlags = {
  __typename?: 'BranchFlags';
  mrf?: Maybe<Scalars['Boolean']>;
  centralStorage?: Maybe<Scalars['Boolean']>;
  ecommerce?: Maybe<Scalars['Boolean']>;
};

export type ContactOptions = {
  __typename?: 'ContactOptions';
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['Email']>;
  phonenumber?: Maybe<Scalars['PhoneNumber']>;
  avatar?: Maybe<Scalars['URL']>;
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
  withTradeIn?: Maybe<Scalars['Boolean']>;
  withHomeDelivery?: Maybe<Scalars['Boolean']>;
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
  name: Scalars['String'];
  price: Scalars['Float'];
  unit: Scalars['String'];
  description: Scalars['String'];
  logotype?: Maybe<Scalars['URL']>;
  addons: Array<InsuranceAddon>;
  items: Array<InsuranceItem>;
  legality?: Maybe<InsuranceLegality>;
  terms?: Maybe<Scalars['URL']>;
  url?: Maybe<Scalars['URL']>;
};

export type InsuranceAddon = {
  __typename?: 'InsuranceAddon';
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  price: Scalars['Float'];
  unit: Scalars['String'];
  exclusions: Array<Scalars['String']>;
};

export type InsuranceItem = {
  __typename?: 'InsuranceItem';
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type InsuranceLegality = {
  __typename?: 'InsuranceLegality';
  description?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['URL']>;
};

export type InsuranceOption = {
  __typename?: 'InsuranceOption';
  description?: Maybe<Scalars['String']>;
  logotype?: Maybe<Scalars['URL']>;
  name?: Maybe<Scalars['String']>;
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
  streetAddress?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  position?: Maybe<Position>;
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
  type: Scalars['String'];
  files: Array<MediaFile>;
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
  monday?: Maybe<HoursOpen>;
  tuesday?: Maybe<HoursOpen>;
  wednesday?: Maybe<HoursOpen>;
  thursday?: Maybe<HoursOpen>;
  friday?: Maybe<HoursOpen>;
  saturday?: Maybe<HoursOpen>;
  sunday?: Maybe<HoursOpen>;
};

export type Organization = {
  __typename?: 'Organization';
  branches: Array<Maybe<Branch>>;
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
  vehicle?: Maybe<Vehicle>;
  branch?: Maybe<Branch>;
  loan?: Maybe<FinancialOption>;
  insurances: Array<Insurance>;
};


export type QueryVehicleArgs = {
  id: Scalars['ID'];
  branch?: Maybe<Scalars['ID']>;
};


export type QueryBranchArgs = {
  id: Scalars['ID'];
};


export type QueryLoanArgs = {
  id: Scalars['ID'];
  duration: Scalars['Int'];
  downPayment: Scalars['Int'];
  residual: Scalars['Float'];
};


export type QueryInsurancesArgs = {
  id: Scalars['ID'];
  personalNumber: Scalars['PersonalNumber'];
  drivingDistance: DrivingDistance;
};

export type SafetyOption = {
  __typename?: 'SafetyOption';
  content?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['URL']>;
};

export type Service = {
  __typename?: 'Service';
  markdown?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};



export type Vehicle = {
  __typename?: 'Vehicle';
  id: Scalars['ID'];
  branch?: Maybe<Branch>;
  contact?: Maybe<ContactOptions>;
  data: VehicleData;
  description?: Maybe<Scalars['String']>;
  discount?: Maybe<Scalars['Float']>;
  ecommerce?: Maybe<Ecommerce>;
  financialOptions: Array<FinancialOption>;
  flags?: Maybe<VehicleFlags>;
  insuranceOptions: Array<InsuranceOption>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  manufacturer?: Maybe<Manufacturer>;
  media: Array<Media>;
  location?: Maybe<Location>;
  packageOptions: Array<PackageOption>;
  price: Scalars['Float'];
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
  properties?: Maybe<Array<Scalars['String']>>;
  category?: Maybe<Scalars['String']>;
};



export type VehicleFlags = {
  __typename?: 'VehicleFlags';
  auction?: Maybe<Scalars['Boolean']>;
  testDrive?: Maybe<Scalars['Boolean']>;
};
