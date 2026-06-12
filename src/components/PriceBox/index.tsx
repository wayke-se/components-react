import React from 'react';

import { Label, Price, Row, Wrapper } from './wrapper';

interface PriceBoxItemProps {
  label: string;
  price: string;
  oldPrice?: boolean;
}

interface PriceBoxProps {
  prices: PriceBoxItemProps[];
}

const PriceBox = ({ prices }: PriceBoxProps) => (
  <Wrapper>
    {prices?.map((item, i) => (
      <Row key={`${item.label}-${i}`} $oldPrice={item.oldPrice}>
        <Label>{item.label}</Label>
        <Price>{item.price}</Price>
      </Row>
    ))}
  </Wrapper>
);

export default PriceBox;
