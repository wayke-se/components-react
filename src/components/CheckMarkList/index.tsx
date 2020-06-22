import React from 'react';

import { List, Item, Icon, Label } from './wrapper';
import { IconCheck } from '../Icon';

export interface ICheckMarkList {
  children: React.ReactNode;
}

export const CheckMarkListItem = ({ children }: ICheckMarkList) => (
  <Item>
    <Icon>
      <IconCheck block />
    </Icon>
    <Label>{children}</Label>
  </Item>
);

const CheckMarkList = ({ children }: ICheckMarkList) => <List>{children}</List>;

export default CheckMarkList;
