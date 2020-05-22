import * as React from 'react';

import { List, Item, Action, Icon, Label } from './wrapper';
import { IconPhone, IconMail } from '../Icon';

const ActionList = () => (
  <List>
    <Item>
      <Action onClick={() => {}} title="">
        <Icon>
          <IconMail block />
        </Icon>
        <Label>Visa mailadress</Label>
      </Action>
    </Item>
    <Item>
      <Action onClick={() => {}} title="">
        <Icon>
          <IconPhone block />
        </Icon>
        <Label>Visa telefonnummer</Label>
      </Action>
    </Item>
  </List>
);

export default ActionList;
