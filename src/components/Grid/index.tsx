import React from 'react';

import { Wrapper, List, Item } from './wrapper';
import ProductCard from '../ProductCard';
import { Document } from '../../@types/search';
import { numberSeparator } from '../../utils/formats';

interface GridProps {
  documents?: Document[];
  onClickItem?: (id: string) => void;
}

const Grid = ({ documents, onClickItem }: GridProps) => {
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
              href={`#${document._id}`}
              image={
                `${document.featuredImage?.files?.[0]?.url}?w=567&q=72` ||
                'http://placehold.it/600x400'
              }
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
                  title: 'Diesel(???)',
                },
              ]}
              price={`${numberSeparator(document.price)} kr`}
              oldPrice={`${numberSeparator(document.price)} kr`}
            />
          </Item>
        ))}
      </List>
    </Wrapper>
  );
};

export default Grid;
