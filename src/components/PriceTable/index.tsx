import React from 'react';

import { List, Item, Value, Label } from './wrapper';
import { VisualHeading } from '../Heading';
import { Price, OldPrice } from '../Price';
import { numberSeparator } from '../../utils/formats';

interface PriceTableProps {
  price: number;
  oldPrice?: number;
}

const PriceTable = ({ price, oldPrice }: PriceTableProps) => (
  <List>
    <Item>
      <Label>
        <VisualHeading>Pris</VisualHeading>
      </Label>
      <Value>
        <Price>{numberSeparator(price)} kr</Price>
      </Value>
    </Item>
    {oldPrice !== undefined && (
      <Item>
        <Label />
        <Value>
          <OldPrice>{numberSeparator(oldPrice)} kr</OldPrice>
        </Value>
      </Item>
    )}
  </List>
);

export default PriceTable;
