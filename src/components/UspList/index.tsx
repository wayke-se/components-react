import React from 'react';

import { List, Item, Box, ItemSection, Action } from './wrapper';
import { IconInfo } from '../Icon';

export interface ItemProps {
  title: string;
  onClick?: () => void;
}

export interface Props {
  items?: ItemProps[];
  small?: boolean;
}

const UspItem = ({ title, onClick }: ItemProps) => {
  return (
    <Item>
      <Box>
        <ItemSection>{title}</ItemSection>
        {onClick && (
          <ItemSection>
            <Action onClick={onClick}>
              <IconInfo block />
            </Action>
          </ItemSection>
        )}
      </Box>
    </Item>
  );
};

const UspList = ({ items, small }: Props) => {
  if (!items) {
    return null;
  }

  return (
    <List isSmall={small}>
      {items.map((item) => (
        <UspItem key={item.title} title={item.title} onClick={item.onClick} />
      ))}
    </List>
  );
};

export default UspList;
