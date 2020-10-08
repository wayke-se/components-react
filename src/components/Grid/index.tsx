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
  placeholderImage?: string;
  onClickItem?: (id: string) => void;
}

const Grid = ({ documents, placeholderImage, hashRoute, onClickItem }: GridProps) => {
  if (!documents) {
    return null;
  }

  return (
    <Wrapper>
      <List>
        {documents.map((document) => (
          <Item key={document._id}>
            <ProductCard
              id={document._id}
              onClick={onClickItem}
              title={document.title}
              href={hashRoute ? `#${document._id}` : undefined}
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
        ))}
      </List>
    </Wrapper>
  );
};

export default Grid;
