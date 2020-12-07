import React from 'react';

import { Wrapper, List, Item } from './wrapper';
import ProductCard from '../ProductCard/index';
import { Document } from '../../@types/search';
import { numberSeparator } from '../../utils/formats';

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
  onClickItem?: (id: string) => void;
}

const Grid = ({ documents, placeholderImage, hashRoute, pathRoute, onClickItem }: GridProps) => {
  if (!documents) {
    return null;
  }

  return (
    <Wrapper>
      <List>
        {documents.map((document) => {
          const _path = pathRoute?.replace(/^\/|\/$/g, '');

          const prefix = _path ? `/${_path}/` : '/';

          const pathRouteUrl =
            window.location.pathname === '/'
              ? `${prefix}${document._id}`
              : `${window.location.pathname}${prefix}${document._id}`;

          return (
            <Item key={document._id}>
              <ProductCard
                id={document._id}
                onClick={onClickItem}
                title={document.title}
                pathRoute={pathRoute}
                href={pathRoute ? pathRouteUrl : hashRoute ? `#${document._id}` : undefined}
                image={resolveImage(document)}
                placeholderImage={placeholderImage}
                description={document.shortDescription}
                uspList={[
                  {
                    title: document.modelYear,
                  },
                  {
                    title: document.modelSeries,
                  },
                  {
                    title: `${numberSeparator(document.mileage)} mil`,
                  },
                  {
                    title: document.gearboxType,
                  },
                  {
                    title: document.fuelType,
                  },
                ]}
                price={`${numberSeparator(document.price)} kr`}
                oldPrice={
                  document.oldPrice !== undefined && document.price < document.oldPrice
                    ? `${numberSeparator(document.oldPrice)} kr`
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
