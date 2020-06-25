import React from 'react';

import { List } from './wrapper';
import { IconPhone, IconMail } from '../Icon/index';
import ToggleItem from './toggle-item';
import { Maybe, ContactOptions } from '../../@types/codegen/types';

interface ActionListProps {
  contact?: Maybe<ContactOptions>;
}

const ActionList = ({ contact }: ActionListProps) => (
  <List>
    {contact?.email && (
      <ToggleItem
        title="Visa mailadress"
        value={contact.email}
        icon={<IconMail block />}
        type="mailto"
      />
    )}
    {contact?.phonenumber && (
      <ToggleItem
        title="Visa telefonnummer"
        value={contact.phonenumber}
        icon={<IconPhone block />}
        type="tel"
      />
    )}
  </List>
);

export default ActionList;
