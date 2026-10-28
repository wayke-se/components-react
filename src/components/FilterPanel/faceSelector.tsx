import React from 'react';
import { useTranslation } from 'react-i18next';
import { isRangeFilter } from '../../Gql/facets';
import useSettings from '../../State/Settings/useSettings';
import CheckListFacet from './checkListFacet';
import ColorSelectFacet from './colorFacet';
import RangeFacet from './rangeFacet';

interface FacetSelectorProps {
  id: string;
}

const FacetSelector = ({ id }: FacetSelectorProps) => {
  const { t } = useTranslation();
  const { marketCode } = useSettings();

  if (id === 'colorName') return <ColorSelectFacet id={id} />;
  if (!isRangeFilter(id)) return <CheckListFacet id={id} />;

  switch (id) {
    case 'price':
      return <RangeFacet id={id} unit={t('currency.default')} formatValues />;
    case 'privateLease':
    case 'businessLease':
      return <RangeFacet id={id} unit={t('currency.monthly')} formatValues />;
    case 'odometer':
      return (
        <RangeFacet
          id={id}
          unit={t(`odometer.${marketCode === 'NO' ? 'Kilometer' : 'ScandinavianMile'}`)}
          formatValues
        />
      );
    case 'modelYear':
      return <RangeFacet id={id} unit="år" />;
    default:
      return null;
  }
};

export default FacetSelector;
