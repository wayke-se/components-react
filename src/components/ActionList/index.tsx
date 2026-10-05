import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Branch, ContactOptions, Maybe, VehicleData } from '../../@types/codegen/types';
import { formatPhonenumber } from '../../utils/phonenumbers';
import PubSub from '../../utils/pubsub/pubsub';
import ToggleItem from './toggle-item';

interface ActionListProps {
  id: string;
  vehicleData?: Maybe<VehicleData>;
  branch?: Maybe<Branch>;
  contact?: Maybe<ContactOptions>;
}

const ActionList = ({ id, vehicleData, contact, branch }: ActionListProps) => {
  const { t } = useTranslation();
  const email = contact?.email || branch?.contact?.email;
  const phonenumber = contact?.phonenumber || branch?.contact?.phonenumber;

  // Pre-populated subject/body gives the dealer a way to tell these leads apart from
  // other inbound mail, and tells them which site and vehicle the request concerns.
  const emailHref = useMemo(() => {
    if (!email) return undefined;
    const vehicle = [
      vehicleData?.registrationNumber,
      [vehicleData?.manufacturer, vehicleData?.modelSeries].filter(Boolean).join(' '),
    ]
      .filter(Boolean)
      .join(', ');
    const subject = t('item.actions.emailSubject', {
      hostName: window.location.hostname,
      vehicle,
    });
    const body = t('item.actions.emailBody', { url: window.location.href });
    return `${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [email, vehicleData, t]);

  const trackPayload = useMemo(
    () => ({ id, branchId: branch?.id, branchName: branch?.name }),
    [branch, id]
  );
  const onClickMailVisible = useCallback(
    () => PubSub.publish('MailVisible', trackPayload),
    [trackPayload]
  );
  const onClickMailValue = useCallback(
    () => PubSub.publish('MailClick', trackPayload),
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
          onClickValue={onClickMailValue}
          title={t('item.actions.showEmail')}
          value={email}
          href={emailHref}
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
