import * as React from 'react';

import { List } from './wrapper';
import { IconPhone, IconMail } from '../Icon';
import ToggleItem from './toggle-item';
import { Maybe, ContactOptions } from '../../@types/codegen/types';

interface ActionListProps {
  contact?: Maybe<ContactOptions>;
}

const ActionList = ({ contact }: ActionListProps) => {
  return (
    <List>
      {contact?.email && (
        <ToggleItem title="Visa mailadress" value={contact.email} icon={<IconMail block />} />
      )}
      {contact?.phonenumber && (
        <ToggleItem
          title="Visa telefonnummer"
          value={contact.phonenumber}
          icon={<IconPhone block />}
        />
      )}
    </List>
  );
};

export default ActionList;
