import React from 'react';

import { List, Item, Value, Label } from './wrapper';
import { VisualHeading } from '../Heading/index';
import { Price, OldPrice } from '../Price/index';
import { numberSeparator } from '../../utils/formats';

interface PriceTableProps {
  price: number;
  discount?: number;
}

const PriceTable = ({ price, discount }: PriceTableProps) => (
  <List>
    <Item>
      <Label>
        <VisualHeading>Pris</VisualHeading>
      </Label>
      <Value>
        <Price>{numberSeparator(price)} kr</Price>
      </Value>
    </Item>
    {discount !== undefined && (
      <Item>
        <Label />
        <Value>
          <OldPrice>{numberSeparator(price + discount)} kr</OldPrice>
        </Value>
      </Item>
    )}
  </List>
);

export default PriceTable;
