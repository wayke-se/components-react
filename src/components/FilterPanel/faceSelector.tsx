import React from 'react';
import { useTranslation } from 'react-i18next';
import { Facet } from '../../@types/search';
import {
  BRANCH,
  BUSINESS_LEASING_PRICE,
  COLOR,
  DRIVING_WHEEL,
  ELECTRICAL_RANGE_WLTP,
  ENGINE_BASE_TYPE,
  ENVIRONMENT_CLASS,
  FUEL_TYPE,
  FUEL_TYPES,
  GEARBOX_TYPE,
  LEASING_PRICE,
  MANUFACTURER,
  MILEAGE,
  MODEL_SERIES,
  MODEL_YEAR,
  ODOMETER_VALUE_AS_KM,
  PRICE,
  SEGMENT,
} from '../../utils/constants';
import CheckListFacet from './checkListFacet';
import ColorSelectFacet from './colorFacet';
import RangeFacet from './rangeFacet';

interface FacetSelectorProps {
  facet: Facet;
}

const FacetSelector = ({ facet }: FacetSelectorProps) => {
  const { t } = useTranslation();
  switch (facet.id) {
    case ENGINE_BASE_TYPE:
    case FUEL_TYPES:
    case MANUFACTURER:
    case MODEL_SERIES:
    case FUEL_TYPE:
    case GEARBOX_TYPE:
    case BRANCH:
    case ENVIRONMENT_CLASS:
    case SEGMENT:
    case DRIVING_WHEEL:
      return <CheckListFacet facet={facet} />;
    case COLOR:
      return <ColorSelectFacet facet={facet} />;
    case PRICE:
      return <RangeFacet facet={facet} unit={t('currency.default')} formatValues />;
    case BUSINESS_LEASING_PRICE:
    case LEASING_PRICE:
      return <RangeFacet facet={facet} unit={t('currency.monthly')} formatValues />;
    case ODOMETER_VALUE_AS_KM:
      return <RangeFacet facet={facet} unit={t('odometer.Kilometer')} formatValues />;
    case MILEAGE:
      return <RangeFacet facet={facet} unit={t('odometer.ScandinavianMile')} formatValues />;
    case MODEL_YEAR:
      return <RangeFacet facet={facet} unit="år" />;
    case ELECTRICAL_RANGE_WLTP:
      return <RangeFacet facet={facet} unit={t('odometer.Kilometer')} />;
    default:
      return null;
  }
};

export default FacetSelector;
