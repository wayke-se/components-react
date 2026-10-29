import { i18nScoped } from './I18n';

/** The sort keys offered (searchParams.ts SORT_OPTIONS), in order, with their translation. */
const SORT_LABELS: Record<string, string> = {
  'published-desc': 'search.sortOptions.publishedDesc',
  'published-asc': 'search.sortOptions.publishedAsc',
  'price-asc': 'search.sortOptions.priceAsc',
  'price-desc': 'search.sortOptions.priceDesc',
  'modelYear-desc': 'search.sortOptions.modelDesc',
  'modelYear-asc': 'search.sortOptions.modelAsc',
  'odometer-asc': 'search.sortOptions.mileageAsc',
  'odometer-desc': 'search.sortOptions.mileageDesc',
};

export const sortOptions = () =>
  Object.entries(SORT_LABELS).map(([value, label]) => ({
    value,
    displayName: i18nScoped.t(label),
  }));
