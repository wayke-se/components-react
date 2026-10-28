import React from 'react';
import { useTranslation } from 'react-i18next';
import { hitImage, toAmount } from '../../Gql/hit';
import { SearchHit } from '../../Gql/types';
import { numberSeparator } from '../../utils/formats';
import ProductCard from '.';

interface HitCardProps {
  hit: SearchHit;
  placeholderImage?: string;
  displayBranchName?: boolean;
}

/** A search hit as a product card: the search result and the related cars share it. */
const HitCard = ({ hit, placeholderImage, displayBranchName }: HitCardProps) => {
  const { t } = useTranslation();
  const { ad, iteration } = hit;
  const item = iteration?.item;
  const odometer = iteration?.logistics?.odometerReading;
  const price = toAmount(ad.pricing?.cash?.price);
  const oldPrice = toAmount(ad.pricing?.cash?.oldPrice);
  const money = (amount?: number, unit = 'currency.default') =>
    amount !== undefined ? `${numberSeparator(amount)} ${t(unit)}` : undefined;
  const usps: { title?: string | number }[] = [
    { title: item?.modelYear?.intValue },
    {
      title: odometer
        ? `${numberSeparator(odometer.value)} ${t(
            `odometer.${odometer.unit === 'KILOMETER' ? 'Kilometer' : 'ScandinavianMile'}`
          )}`
        : undefined,
    },
    { title: item?.attributes?.transmission?.formattedValue },
    { title: item?.driveline?.fuelTypesString?.stringValue },
  ];

  return (
    <ProductCard
      id={ad.id}
      title={item?.displayName || ad.salesDescription?.title || ''}
      description={ad.salesDescription?.title || undefined}
      image={hitImage(hit)}
      placeholderImage={placeholderImage}
      branch={{ id: ad.branch.id, name: ad.branch.displayName || undefined }}
      branchName={displayBranchName ? ad.branch.displayName || undefined : undefined}
      uspList={usps.filter((usp): usp is { title: string | number } => !!usp.title)}
      price={money(price)}
      oldPrice={
        price !== undefined && oldPrice !== undefined && price < oldPrice
          ? money(oldPrice)
          : undefined
      }
      leasingPrice={money(toAmount(ad.pricing?.leasing?.leasingMonthlyPayment), 'currency.monthly')}
      businessLeasingPrice={money(
        toAmount(ad.pricing?.companyLeasing?.leasingMonthlyPayment),
        'currency.monthly'
      )}
    />
  );
};

export default HitCard;
