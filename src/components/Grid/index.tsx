import React from 'react';
import { SearchHit } from '../../Gql/types';
import HitCard from '../ProductCard/HitCard';
import { Item, List, Wrapper } from './wrapper';

interface GridProps {
  hits: SearchHit[];
  placeholderImage?: string;
  displayBranchName?: boolean;
}

const Grid = ({ hits, placeholderImage, displayBranchName }: GridProps) => (
  <Wrapper>
    <List>
      {hits.map((hit) => (
        <Item key={hit.ad.id}>
          <HitCard
            hit={hit}
            placeholderImage={placeholderImage}
            displayBranchName={displayBranchName}
          />
        </Item>
      ))}
    </List>
  </Wrapper>
);

export default Grid;
