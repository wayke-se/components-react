import React, { useCallback, useMemo } from 'react';

import ToggleItem from './toggle-item';
import { Maybe, ContactOptions, Branch } from '../../@types/codegen/types';
import { formatPhonenumber } from '../../utils/phonenumbers';
import PubSub from '../../utils/pubsub/pubsub';
import { useTranslation } from 'react-i18next';

interface ActionListProps {
  id: string;
  branch?: Maybe<Branch>;
  contact?: Maybe<ContactOptions>;
}

const ActionList = ({ id, contact, branch }: ActionListProps) => {
  const { t } = useTranslation();
  const email = contact?.email || branch?.contact?.email;
  const phonenumber = contact?.phonenumber || branch?.contact?.phonenumber;

  const trackPayload = useMemo(
    () => ({ id, branchId: branch?.id, branchName: branch?.name }),
    [branch, id]
  );
  const onClickMailVisible = useCallback(
    () => PubSub.publish('MailVisible', trackPayload),
    [trackPayload]
  );
  const onClickPhoneVisible = useCallback(
    () => PubSub.publish('PhonenumberVisible', trackPayload),
    [trackPayload]
  );
  const onClickPhoneValue = useCallback(
    () => PubSub.publish('PhonenumberCall', trackPayload),
    [trackPayload]
  );

  if (!email && !phonenumber) {
    return null;
  }

  return (
    <>
      {email && (
        <ToggleItem
          onClickVisible={onClickMailVisible}
          title={t('item.actions.showEmail')}
          value={email}
          type="mailto"
        />
      )}
      {phonenumber && (
        <ToggleItem
          title={t('item.actions.showPhoneNumber')}
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
