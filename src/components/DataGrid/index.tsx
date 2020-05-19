import React from 'react';

import { List, Item, Label, Heading, Info, Value } from './wrapper';
import { IconInfo } from '../Icon';

export interface ItemProps {
  label: string;
  value: string | number | null;
  onClick?: () => void;
}

export interface Props {
  items?: ItemProps[];
}

const DataGrid = ({ items }: Props) => {
  if (!items) {
    return null;
  }

  return (
    <List>
      {items.map((item) => (
        <Item key={item.label}>
          <Label>
            <Heading>{item.label}</Heading>
            {item.onClick && (
              <Info onClick={item.onClick} title="Mer info">
                <IconInfo block />
              </Info>
            )}
          </Label>
          <Value>{item.value}</Value>
        </Item>
      ))}
    </List>
  );
};

export default DataGrid;
