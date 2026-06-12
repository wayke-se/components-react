import React from 'react';
import { IconCheck } from '../Icon';
import { Icon, Item, Label, List } from './wrapper';

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
