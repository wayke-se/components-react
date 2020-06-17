import React from 'react';

import { List, Item, Label, Value } from './wrapper';

interface ItemProps {
  label: string;
  value: string;
}

interface Props {
  items: ItemProps[];
}

const DataList = ({ items }: Props) => (
  <List>
    {items.map((item) => (
      <Item key={item.label}>
        <Label>{item.label}</Label>
        <Value>{item.value}</Value>
      </Item>
    ))}
  </List>
);

export default DataList;
