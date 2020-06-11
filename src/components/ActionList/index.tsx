import * as React from 'react';

import { List } from './wrapper';
import { IconPhone, IconMail } from '../Icon';
import { SearchItem_vehicle_contact } from '../../@types/gql/SearchItem';
import ToggleItem from './toggle-item';

interface ActionListProps {
  contact: SearchItem_vehicle_contact | null;
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
