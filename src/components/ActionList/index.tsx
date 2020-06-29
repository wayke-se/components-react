import React, { useCallback } from 'react';

import ToggleItem from './toggle-item';
import { Maybe, ContactOptions, Branch } from '../../@types/codegen/types';
import { formatPhonenumber } from '../../utils/phonenumbers';
import PubSub from '../../utils/pubsub/pubsub';

interface ActionListProps {
  branch?: Maybe<Branch>;
  contact?: Maybe<ContactOptions>;
}

const ActionList = ({ contact, branch }: ActionListProps) => {
  const email = contact?.email || branch?.contact?.email;
  const phonenumber = contact?.phonenumber || branch?.contact?.phonenumber;

  const onClickMailVisible = useCallback(() => PubSub.publish('MailVisible'), []);
  const onClickPhoneVisible = useCallback(() => PubSub.publish('PhonenumberVisible'), []);
  const onClickPhoneValue = useCallback(() => PubSub.publish('PhonenumberCall'), []);

  if (!email && !phonenumber) {
    return null;
  }

  return (
    <>
      {email && (
        <ToggleItem
          onClickVisible={onClickMailVisible}
          title="Visa mailadress"
          value={email}
          type="mailto"
        />
      )}
      {phonenumber && (
        <ToggleItem
          title="Visa telefonnummer"
          value={formatPhonenumber(phonenumber)}
          type="tel"
          onClickVisible={onClickPhoneVisible}
          onClickValue={onClickPhoneValue}
        />
      )}
    </>
  );
};

export default ActionList;
