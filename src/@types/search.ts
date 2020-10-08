export interface Stats {
  totalHits: number;
  searchEngineTimeInMillis: number;
  searchEngineRoundTripTimeInMillis: number;
  searchProcessingTimeInMillis: number;
}

export interface Branch {
  id: string;
  name: string;
}

export interface Format {
  format: string;
  id: string;
  url: string;
}

export interface File {
  formats: Format[];
  id: string;
  sortOrder: number;
  url: string;
}

export interface FeaturedImage {
  files: File[];
  id: string;
  sortOrder: number;
  type: 'Image';
}

export interface PaginationPage {
  displayName: string;
  selected: boolean;
  query: string;
}

export interface Pagination {
  offset: number;
  hitsPerPage: number;
  firstPage: string | null;
  previousPage: string | null;
  nextPage: PaginationPage | null;
  pages: PaginationPage[];
}

export interface SortOption {
  displayName: string;
  selected: boolean;
  query: string;
}

export interface DocumentList {
  id: string;
  displayName: string;
  numberOfHits: number;
  documents: Document[];
  pagination: Pagination;
  sortOptions: SortOption[];
}

export interface Document {
  _id: string;
  _type: string;
  branches: Branch[];
  deductibleVat: boolean;
  featuredImage: FeaturedImage;
  gearboxType: string;
  hasManufacturerPackaging: boolean;
  itemPublished: string;
  itemUpdated: string;
  manufacturer: string;
  mileage: number;
  modelSeries: string;
  modelYear: number;
  fuelType: string;
  price: number;
  oldPrice?: number;
  registrationNumber: string;
  salesName: string;
  shortDescription: string;
  title: string;
}

export interface FacetFilter {
  displayName: string;
  selected: boolean;
  query: string;
  count: number;
  children: any[];
}

export interface Facet {
  id: string;
  displayName: string;
  selectionType: 'OR';
  multipleLevels: boolean;
  filters: FacetFilter[];
}

export interface Query {
  displayName: string;
  id: string;
  parameters: string | null;
  queryString: string | null;
}

export interface Search {
  stats: Stats;
  query: Query | null;
  documentList: DocumentList;
  facets: Facet[];
  spell: null;
  quickLinks: null;
  errorMessages: string[];
}
