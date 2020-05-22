import React from 'react';

import { List, Item, Value, Label } from './wrapper';
import { VisualHeading } from '../Heading';
import { Price, OldPrice } from '../Price';

const PriceTable = () => (
  <List>
    <Item>
      <Label>
        <VisualHeading>Pris</VisualHeading>
      </Label>
      <Value>
        <Price>389 900 kr</Price>
      </Value>
    </Item>
    <Item>
      <Label />
      <Value>
        <OldPrice>420 000 kr</OldPrice>
      </Value>
    </Item>
  </List>
);

export default PriceTable;
