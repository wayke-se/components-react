import React from 'react';

import { Wrapper, List, Item } from './wrapper';
import ProductCard from '../ProductCard';
import { Document } from '../../@types/search';
import { numberSeparator } from '../../utils/formats';
import i18next from 'i18next';

const resolveImage = (document: Document) => {
  const img = document.featuredImage?.files?.[0]?.url;
  if (img) {
    return `${img}?w=567&q=72`;
  }
  return undefined;
};

interface GridProps {
  documents?: Document[];
  hashRoute?: boolean;
  pathRoute?: string;
  placeholderImage?: string;
  displayBranchName?: boolean;
  onClickItem?: (id: string) => void;
}

const Grid = ({
  documents,
  placeholderImage,
  hashRoute,
  pathRoute,
  displayBranchName,
  onClickItem,
}: GridProps) => {
  if (!documents) {
    return null;
  }

  return (
    <Wrapper>
      <List>
        {documents.map((document) => {
          /*
          const _path = pathRoute?.replace(/^\/|\/$/g, '');

          const prefix = _path ? `/${_path}/` : '/';

          const pathRouteUrl =
            window.location.pathname === '/'
              ? `${prefix}${document._id}`
              : `${window.location.pathname}${prefix}${document._id}`;
          */

          /*
          const _pathRoute = pathRoute
            ? pathRoute.startsWith('/')
              ? `${location.pathname}${pathRoute}/${document._id}`
              : `${pathRoute}/${document._id}`
            : undefined;

          console.log(_pathRoute);
          */

          const _pathRoute = pathRoute ? `${pathRoute}/${document._id}` : undefined;

          return (
            <Item key={document._id}>
              <ProductCard
                id={document._id}
                onClick={onClickItem}
                title={document.title}
                pathRoute={pathRoute}
                href={_pathRoute ? _pathRoute : hashRoute ? `#${document._id}` : undefined}
                image={resolveImage(document)}
                placeholderImage={placeholderImage}
                description={document.shortDescription}
                branchName={displayBranchName ? document.branches?.[0]?.name : undefined}
                uspList={[
                  {
                    title: document.modelYear,
                  },
                  {
                    title: `${numberSeparator(
                      document.odometerReading?.value || document.mileage
                    )} ${i18next.t(
                      `odometer.${document.odometerReading?.unit || 'ScandinavianMile'}`
                    )}`,
                  },
                  {
                    title: document.gearboxType,
                  },
                  {
                    title: document.fuelType,
                  },
                ]}
                price={`${numberSeparator(document.price)} ${i18next.t('currency.default')}`}
                oldPrice={
                  document.oldPrice !== undefined && document.price < document.oldPrice
                    ? `${numberSeparator(document.oldPrice)} ${i18next.t('currency.default')}`
                    : undefined
                }
                leasingPrice={
                  document.leasingPrice !== undefined
                    ? `${numberSeparator(document.leasingPrice)} ${i18next.t('currency.monthly')}`
                    : undefined
                }
                businessLeasingPrice={
                  document.businessLeasingPrice !== undefined
                    ? `${numberSeparator(document.businessLeasingPrice)} ${i18next.t(
                        'currency.monthly'
                      )}`
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
