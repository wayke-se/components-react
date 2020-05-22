import React from 'react';

import { List, Item, Icon, Label } from './wrapper';
import { IconCheck } from '../Icon';

export interface ICheckMarkList {
  children: JSX.Element | JSX.Element[] | string;
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
