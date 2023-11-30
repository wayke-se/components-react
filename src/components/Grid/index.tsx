import React from 'react';

import { Wrapper, List, Item } from './wrapper';
import ProductCard, { OnItemClick } from '../ProductCard';
import { Document } from '../../@types/search';
import { numberSeparator } from '../../utils/formats';
import { useTranslation } from 'react-i18next';

interface GridProps {
  documents?: Document[];
  hashRoute?: boolean;
  pathRoute?: string;
  placeholderImage?: string;
  displayBranchName?: boolean;
  onClickItem?: (data: OnItemClick) => void;
}

const Grid = ({
  documents,
  placeholderImage,
  hashRoute,
  pathRoute,
  displayBranchName,
  onClickItem,
}: GridProps) => {
  const { t } = useTranslation();
  if (!documents) {
    return null;
  }

  return (
    <Wrapper>
      <List>
        {documents.map((document) => {
          const _pathRoute = pathRoute ? `${pathRoute}/${document._id}` : undefined;

          return (
            <Item key={document._id}>
              <ProductCard
                id={document._id}
                onClick={onClickItem}
                title={document.title}
                pathRoute={pathRoute}
                href={_pathRoute ? _pathRoute : hashRoute ? `#${document._id}` : undefined}
                imageFile={document?.featuredImage?.files?.[0]}
                placeholderImage={placeholderImage}
                description={document.shortDescription}
                branch={document.branches?.[0]}
                branchName={displayBranchName ? document.branches?.[0]?.name : undefined}
                uspList={[
                  {
                    title: document.modelYear,
                  },
                  {
                    title: `${numberSeparator(
                      document.odometerReading?.value || document.mileage
                    )} ${t(`odometer.${document.odometerReading?.unit || 'ScandinavianMile'}`)}`,
                  },
                  {
                    title: document.gearboxType,
                  },
                  {
                    title: document.fuelType,
                  },
                ]}
                price={`${numberSeparator(document.price)} ${t('currency.default')}`}
                oldPrice={
                  document.oldPrice !== undefined && document.price < document.oldPrice
                    ? `${numberSeparator(document.oldPrice)} ${t('currency.default')}`
                    : undefined
                }
                leasingPrice={
                  document.leasingPrice !== undefined
                    ? `${numberSeparator(document.leasingPrice)} ${t('currency.monthly')}`
                    : undefined
                }
                businessLeasingPrice={
                  document.businessLeasingPrice !== undefined
                    ? `${numberSeparator(document.businessLeasingPrice)} ${t('currency.monthly')}`
                    : undefined
                }
              />
            </Item>
          );
        })}
      </List>
    </Wrapper>
  );
};

export default Grid;
