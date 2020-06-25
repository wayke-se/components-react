import React from 'react';

import { List } from './wrapper';
import { IconPhone, IconMail } from '../Icon/index';
import ToggleItem from './toggle-item';
import { Maybe, ContactOptions, Branch } from '../../@types/codegen/types';

interface ActionListProps {
  branch?: Maybe<Branch>;
  contact?: Maybe<ContactOptions>;
}

const ActionList = ({ contact, branch }: ActionListProps) => {
  const email = contact?.email || branch?.contact?.email;
  const phonenumber = contact?.phonenumber || branch?.contact?.phonenumber;

  if (!email && !phonenumber) {
    return null;
  }

  return (
    <List>
      {email && (
        <ToggleItem title="Visa mailadress" value={email} icon={<IconMail block />} type="mailto" />
      )}
      {phonenumber && (
        <ToggleItem
          title="Visa telefonnummer"
          value={phonenumber}
          icon={<IconPhone block />}
          type="tel"
        />
      )}
    </List>
  );
};

export default ActionList;
