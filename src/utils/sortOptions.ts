const SortOptionDisplayName = {
  Relevance: 'relevance',
  PublishedAsc: 'published-asc',
  PublishedDesc: 'published-desc',
  PriceAsc: 'price-asc',
  Pricedesc: 'price-desc',
  ModelAsc: 'model-asc',
  Modeldesc: 'model-desc',
};

type SortOptionDisplayName =
  | 'relevance'
  | 'published-asc'
  | 'published-desc'
  | 'price-asc'
  | 'price-desc'
  | 'model-asc'
  | 'model-desc';

export const getTranslatedSortOptionDisplayName = (str: string | SortOptionDisplayName): string => {
  switch (str) {
    case SortOptionDisplayName.Relevance:
      return 'Relevans';
    case SortOptionDisplayName.PublishedAsc:
      return 'Publicerad äldst';
    case SortOptionDisplayName.PublishedDesc:
      return 'Publicerad senast';
    case SortOptionDisplayName.PriceAsc:
      return 'Pris lägst';
    case SortOptionDisplayName.Pricedesc:
      return 'Pris högst';
    case SortOptionDisplayName.ModelAsc:
      return 'Årsmodell äldst';
    case SortOptionDisplayName.Modeldesc:
      return 'Årsmodell nyast';
    default:
      return str;
  }
};
