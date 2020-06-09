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
} from '../../utils/constants';

interface FacetSelectorProps {
  initialFacet?: Facet;
  facet: Facet;
  onFilterUpdate: (query: string) => void;
}

const FacetSelector = ({ initialFacet, facet, onFilterUpdate }: FacetSelectorProps) => {
  if (!initialFacet) {
    return null;
  }
  switch (facet.id) {
    case MANUFACTURER:
    case MODEL_SERIES:
    case FUEL_TYPE:
    case GEARBOX_TYPE:
    case BRANCH:
    case ENVIRONMENT_CLASS:
    case SEGMENT:
    case DRIVING_WHEEL:
      return <CheckListFacet facet={facet} onFilterUpdate={onFilterUpdate} />;
    case COLOR:
      return <ColorSelectFacet facet={facet} onFilterUpdate={onFilterUpdate} />;
    case PRICE:
      return (
        <RangeFacet
          initialFacet={initialFacet}
          facet={facet}
          unit="kr"
          onFilterUpdate={onFilterUpdate}
          formatValues
        />
      );
    case MILEAGE:
      return (
        <RangeFacet
          initialFacet={initialFacet}
          facet={facet}
          unit="mil"
          onFilterUpdate={onFilterUpdate}
          formatValues
        />
      );
    case MODEL_YEAR:
      return (
        <RangeFacet
          initialFacet={initialFacet}
          facet={facet}
          unit="år"
          onFilterUpdate={onFilterUpdate}
        />
      );
    default:
      return null;
  }
};

export default FacetSelector;
