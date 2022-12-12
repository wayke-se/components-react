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
} from '../../utils/constants';

interface FacetSelectorProps {
  facet: Facet;
}

const FacetSelector = ({ facet }: FacetSelectorProps) => {
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
      return <RangeFacet facet={facet} unit="kr" formatValues />;
    case BUSINESS_LEASING_PRICE:
    case LEASING_PRICE:
      return <RangeFacet facet={facet} unit="kr/mån" formatValues />;
    case MILEAGE:
      return <RangeFacet facet={facet} unit="mil" formatValues />;
    case MODEL_YEAR:
      return <RangeFacet facet={facet} unit="år" />;
    default:
      return null;
  }
};

export default FacetSelector;
