// Response shapes for the documents in ./queries.ts.

interface Money {
  amount: string;
}

export interface AdTextContent {
  content: { __typename: string; text?: string | null }[] | null;
}

export interface AdWarranty {
  included: boolean;
  text: string;
  definition: {
    id: string;
    name: string;
    description: string | null;
    logoUrl: string | null;
    externalUrl: string | null;
    usps: string[];
  };
}

export interface PaymentRange {
  min: string | number;
  max: string | number;
  step: string | number;
  default: string | number;
  current: string | number;
}

export interface PaymentResponse {
  financialOptionId: string;
  name?: string | null;
  description?: string | null;
  financialInstitution?: string;
  monthlyCost: string | number;
  interest: string | number;
  effectiveInterest: string | number;
  setupFee: string | number;
  administrationFee: string | number;
  totalCreditCost: string | number;
  totalResidualValue: string | number;
  loanAmount: string | number;
  imageUrl?: string | null;
  link?: string | null;
  linkText?: string | null;
  duration: PaymentRange;
  downPayment: PaymentRange;
  residual: PaymentRange | null;
}

export interface InsuranceProvider {
  institute: string;
  identifier: string;
  logo: string | null;
  title: string;
  description: string;
  longDescription: string;
  url: string;
  insuranceHeader: string | null;
  ecomInsuranceText: string | null;
  requiresPersonalNumber: boolean;
  requiresDistance: boolean;
}

export interface AdMediaItem {
  __typename: 'AdImage' | 'Ad360ImageGroup' | 'AdEmbeddedVideo';
  id: string;
  sortOrder: number;
  url?: string;
  /** SPHERE for a panorama image */
  mediaType?: string | null;
  formats?: { format: string; url: string }[];
  images?: { id: string; url: string }[];
  externalUrl?: string;
}

export interface AttributeValue {
  __typename?: string;
  key: string;
  label: string;
  formattedValue: string;
}

export interface AttributeCategory {
  categoryId: string;
  displayName: string;
  values: AttributeValue[];
  categories?: AttributeCategory[];
}

export interface AdDocument {
  id: string;
  name: string;
  contentType: string;
  uri: string;
  category: string | null;
  sortOrder: number | null;
}

export interface Ad {
  id: string;
  branchId: string;
  createdAt: string;
  salesDescription: { title: string; enriched: string } | null;
  packaging: {
    isDemoVersion: boolean;
    certifiedPreOwned: boolean;
    selectedPackaging: {
      id: string;
      title: string;
      description: string;
      imageUrl: string;
      ctaUrl: string;
      ctaName: string;
    }[];
  };
  channels: {
    __typename: string;
    status?: string;
    inventoryStatus?: string;
    publishedAt?: string | null;
    soldAt?: string | null;
    deliveryTime?: {
      __typename: string;
      date?: string;
      from?: string;
      to?: string;
      unit?: string;
    } | null;
  }[];
  pricing: {
    primaryPriceType: string | null;
    cash: { price: Money; oldPrice: Money | null; deductibleVat: boolean } | null;
    leasing: LeasingPrice | null;
    companyLeasing: LeasingPrice | null;
  } | null;
  leasingPromos: {
    id: string;
    title: string | null;
    description: string | null;
    image: string | null;
    periodMonths: number;
    mileagePerYear: number;
    isBusinessLeasing: boolean;
    link: { url: string; name: string } | null;
  }[];
  media: { totalCount: number; items: AdMediaItem[] };
  equipment: { items: { name: string }[] } | null;
  accessories: {
    id: string;
    name: string;
    price: number | null;
    salePrice: number | null;
    assemblyPrice: number | null;
    shortDescription: string;
    longDescription: string;
    logoUrl: string;
    productPageLink: string | null;
    productPageLinkText: string | null;
    articleNumber: string;
    manufacturer: string | null;
    model: string | null;
    media: { url: string; sortOrder: number }[];
  }[];
  warrantyInfo: AdTextContent;
  offerings: { warranties: AdWarranty[] };
  exchangePolicy: { enabled: boolean };
  contactOption: {
    __typename: 'Branch' | 'AdDefaultContactOptions' | 'AssignedUser' | string;
    id?: string;
    displayName?: string | null;
    telephone?: string | null;
    email?: string | null;
    title?: string | null;
  };
  branch: {
    id: string;
    displayName: string | null;
    description: string | null;
    street: string | null;
    zip: string | null;
    city: string | null;
    latitude: number | null;
    longitude: number | null;
    homePage: string | null;
    logo: string | null;
    market: string;
    contactInformation: { telephone: string | null; email: string | null } | null;
    adDefaultContactOptions: {
      displayName: string | null;
      telephone: string | null;
      email: string | null;
      title: string | null;
      avatarUrl: string | null;
    } | null;
    weekOpeningHours: {
      openingHours:
        | ({ dayOfWeek: string; openFrom: string | null; openTo: string | null } | null)[]
        | null;
    } | null;
    isAutomotiveAssociationVerified: boolean | null;
    promos: {
      id: string;
      title: string | null;
      description: string | null;
      image: string | null;
      link: { url: string; name: string } | null;
    }[];
  };
  authorizedResellerForManufacturer: boolean;
  iteration: {
    id: string;
    displayName: string;
    item: {
      __typename: string;
      displayName?: string;
      registrationNumber?: { stringValue: string } | null;
      vin?: { formattedValue: string } | null;
      manufacturer?: { stringValue: string } | null;
      modelSeries?: { stringValue: string } | null;
      modelName?: { stringValue: string } | null;
      modelYear?: { intValue: number } | null;
      manufactureYear?: { intValue: number } | null;
      salesName?: { stringValue: string } | null;
      driveline?: { fuelTypesString: { stringValue: string } | null } | null;
      attributes?: {
        transmission: { formattedValue: string } | null;
        enginePower: { intValue: number; formattedValue: string } | null;
        byCategory: AttributeCategory[];
      } | null;
    } | null;
    logistics: {
      odometerReading: { value: number; unit: 'KILOMETER' | 'SCANDINAVIAN_MILE' } | null;
    } | null;
    commerce: {
      enabled: boolean;
      disabledOnWayke: boolean;
      allowTradeIn: boolean;
      homeDelivery: boolean;
      reserved: boolean;
      insuranceProvider: InsuranceProvider | null;
      paymentDetailsList: PaymentResponse[];
    };
    documents: { public: AdDocument[] | null };
  } | null;
}

export interface LeasingPrice {
  issuer: string;
  leasingMonthlyPayment: Money | null;
  contractMonthsRemaining: number | null;
  contractKilometersRemaining: number | null;
}

export interface AdData {
  ads: { byAdId: Ad | null } | null;
}

export interface AdIdByLegacyIdData {
  ads: { byIterationId: { ads: { id: string }[] | null } | null } | null;
}

export interface CalculatePaymentData {
  ads: {
    byAdId: { iteration: { commerce: { calculatePayment: PaymentResponse | null } } | null } | null;
  } | null;
}

export interface InsuranceInquiryInsurance {
  name: string;
  price: number;
  unit: string;
  description: string;
  branding: string;
  legalUrl: string;
  legalDescription: string;
  details: { institute: string; logo: string | null; terms: string | null };
  insuranceItems: { name: string; description: string }[];
  addons:
    | { id: string; title: string; price: number; description: string; exclude: string[] }[]
    | null;
}

export interface InsuranceInquiryData {
  ads: {
    byAdId: {
      iteration: {
        commerce: { insuranceInquiry: { insurances: (InsuranceInquiryInsurance | null)[] | null } };
      } | null;
    } | null;
  } | null;
}

export type AdAccessory = Ad['accessories'][number];
