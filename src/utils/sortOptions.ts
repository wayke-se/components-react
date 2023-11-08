import i18next from 'i18next';

const SortOptionDisplayName = {
  PublishedAsc: 'published-asc',
  PublishedDesc: 'published-desc',
  PriceAsc: 'price-asc',
  Pricedesc: 'price-desc',
  ModelAsc: 'model-asc',
  Modeldesc: 'model-desc',
  MileageAsc: 'mileage-asc',
  Mileagedesc: 'mileage-desc',
};

type SortOptionDisplayName =
  | 'relevance'
  | 'published-asc'
  | 'published-desc'
  | 'price-asc'
  | 'price-desc'
  | 'model-asc'
  | 'model-desc'
  | 'mileage-asc'
  | 'mileage-desc';

export const getTranslatedSortOptionDisplayName = (str: string | SortOptionDisplayName): string => {
  switch (str) {
    case SortOptionDisplayName.PublishedAsc:
      return i18next.t('search.sortOptions.publishedAsc');
    case SortOptionDisplayName.PublishedDesc:
      return i18next.t('search.sortOptions.publishedDesc');
    case SortOptionDisplayName.PriceAsc:
      return i18next.t('search.sortOptions.priceAsc');
    case SortOptionDisplayName.Pricedesc:
      return i18next.t('search.sortOptions.priceDesc');
    case SortOptionDisplayName.ModelAsc:
      return i18next.t('search.sortOptions.modelAsc');
    case SortOptionDisplayName.Modeldesc:
      return i18next.t('search.sortOptions.modelDesc');
    case SortOptionDisplayName.MileageAsc:
      return i18next.t('search.sortOptions.mileageAsc');
    case SortOptionDisplayName.Mileagedesc:
      return i18next.t('search.sortOptions.mileageDesc');
    default:
      return str;
  }
};
