import React from 'react';

import { List, Item, Link, Label } from './wrapper';

export interface ItemProps {
  title: string;
  href?: string;
}

export interface Props {
  items?: ItemProps[];
}

const Breadcrumbs = ({ items }: Props) => {
  if (!items) {
    return null;
  }

  return (
    <List>
      {items.map((item) => (
        <Item key={item.title}>
          {item.href ? (
            <Link href={item.href} title={item.title}>
              {item.title}
            </Link>
          ) : (
            <Label>{item.title}</Label>
          )}
        </Item>
      ))}
    </List>
  );
};

export default Breadcrumbs;
