import React from 'react';

import { Facet } from '../../@types/search';
import CheckListFacet from './checkListFacet';
import ColorSelectFacet from './colorFacet';
import RangeFacet from './rangeFacet';
import {
  MANUFACTURER,
  MODEL_SERIES,
  FUEL_TYPE,
  GEARBOX_TYPE,
  ENVIRONMENT_CLASS,
  SEGMENT,
  DRIVING_WHEEL,
  COLOR,
  PRICE,
  BRANCH,
  MILEAGE,
  MODEL_YEAR,
  LEASING_PRICE,
  BUSINESS_LEASING_PRICE,
  ODOMETER_VALUE_AS_KM,
} from '../../utils/constants';
import { useTranslation } from 'react-i18next';

interface FacetSelectorProps {
  facet: Facet;
}

const FacetSelector = ({ facet }: FacetSelectorProps) => {
  const { t } = useTranslation();
  switch (facet.id) {
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
    default:
      return null;
  }
};

export default FacetSelector;
