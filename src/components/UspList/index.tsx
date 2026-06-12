import React from 'react';
import { IconInfo } from '../Icon';
import { Action, Box, Item, ItemSection, List } from './wrapper';

export interface ItemProps {
  title: string | number | null;
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
    <List $isSmall={small}>
      {items.map((item, index) => (
        <UspItem key={`${item.title}-${index}`} title={item.title} onClick={item.onClick} />
      ))}
    </List>
  );
};

export default UspList;
