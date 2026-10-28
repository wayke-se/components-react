import React, { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ConversionOption,
  ConversionOptionEmail,
  ConversionOptionText,
  ConversionOptionVehicle,
  defaultConversionOptions,
} from '../../@types/conversion';
import { adEvent, contactPerson, ecom } from '../../Gql/ad/view';
import useAdContext from '../../State/Ad/AdContext';
import { formatPhonenumber } from '../../utils/phonenumbers';
import PubSub from '../../utils/pubsub/pubsub';
import { ButtonContent, ButtonPrimary, ButtonSecondary } from '../Button';
import LeadForm, { LeadCommunication } from '../LeadForm';
import { RepeatTiny } from '../Repeat';
import ToggleItem from './toggle-item';

interface ActionListProps {
  title: string;
  conversionOptions?: ConversionOption[];
  /** Undefined when the site has no ecomSettings, which hides the buy button. */
  toggleEcomModal?: () => void;
}

const resolveText = (text: ConversionOptionText, vehicle: ConversionOptionVehicle) =>
  typeof text === 'function' ? text(vehicle) : text;

const ActionList = ({
  title,
  conversionOptions = defaultConversionOptions,
  toggleEcomModal,
}: ActionListProps) => {
  const { t } = useTranslation();
  const ad = useAdContext();
  const contact = contactPerson(ad);
  const email = contact?.email || ad.branch.contactInformation?.email;
  const phonenumber = contact?.phone || ad.branch.contactInformation?.telephone;
  const ecommerce = ecom(ad);

  const vehicle = useMemo<ConversionOptionVehicle>(() => {
    const item = ad.iteration?.item;
    return {
      id: ad.id,
      title,
      registrationNumber: item?.registrationNumber?.stringValue,
      manufacturer: item?.manufacturer?.stringValue,
      modelSeries: item?.modelSeries?.stringValue,
    };
  }, [ad, title]);

  // Pre-populated subject/body gives the dealer a way to tell these leads apart from
  // other inbound mail, and tells them which site and vehicle the request concerns.
  const emailHref = useCallback(
    (option: ConversionOptionEmail) => {
      if (!email) return undefined;
      const vehicleLabel = [
        vehicle.registrationNumber,
        [vehicle.manufacturer, vehicle.modelSeries].filter(Boolean).join(' '),
      ]
        .filter(Boolean)
        .join(', ');
      const subject = option.subject
        ? resolveText(option.subject, vehicle)
        : t('item.actions.emailSubject', {
            hostName: window.location.hostname,
            vehicle: vehicleLabel,
          });
      const params = new URLSearchParams({ subject });
      if (option.body !== false) {
        params.set(
          'body',
          option.body
            ? resolveText(option.body, vehicle)
            : t('item.actions.emailBody', { url: window.location.href })
        );
      }
      // URLSearchParams encodes spaces as "+", which mail clients render literally.
      return `${email}?${params.toString().replace(/\+/g, '%20')}`;
    },
    [email, vehicle, t]
  );

  const trackPayload = useMemo(() => adEvent(ad), [ad]);
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

  const [leadCommunication, setLeadCommunication] = useState<LeadCommunication>();
  const openLeadForm = useCallback(
    (communication: LeadCommunication) => {
      setLeadCommunication(communication);
      PubSub.publish('LeadOpen', { ...trackPayload, communication });
    },
    [trackPayload]
  );
  const closeLeadForm = useCallback(() => setLeadCommunication(undefined), []);

  const renderButton = (
    key: string,
    label: string,
    primary: boolean,
    onClick: () => void,
    disabled?: boolean
  ) => {
    const Button = primary ? ButtonPrimary : ButtonSecondary;
    return (
      <RepeatTiny key={key}>
        <Button fullWidth disabled={disabled} onClick={onClick} title={label}>
          <ButtonContent>{label}</ButtonContent>
        </Button>
      </RepeatTiny>
    );
  };

  const buttons = conversionOptions.map((option, index) => {
    const key = `${option.type}-${index}`;
    switch (option.type) {
      case 'ecom':
        if (!ecommerce.enabled || !toggleEcomModal) return null;
        return renderButton(
          key,
          option.name || t('item.actions.buyOnline'),
          option.primary ?? true,
          toggleEcomModal,
          !!ecommerce.reserved
        );
      case 'leadMessage':
        return renderButton(
          key,
          option.name || t('lead.messageFormTitle'),
          option.primary ?? true,
          () => openLeadForm('email')
        );
      case 'leadCallMe':
        return renderButton(
          key,
          option.name || t('lead.callFormTitle'),
          option.primary ?? true,
          () => openLeadForm('callme')
        );
      case 'email':
        if (!email) return null;
        return (
          <ToggleItem
            key={key}
            onClickVisible={onClickMailVisible}
            onClickValue={onClickMailValue}
            title={option.name || t('item.actions.showEmail')}
            value={email}
            href={emailHref(option)}
            type="mailto"
            primary={option.primary ?? false}
          />
        );
      case 'phone':
        if (!phonenumber) return null;
        return (
          <ToggleItem
            key={key}
            title={option.name || t('item.actions.showPhoneNumber')}
            value={formatPhonenumber(phonenumber)}
            type="tel"
            onClickVisible={onClickPhoneVisible}
            onClickValue={onClickPhoneValue}
            primary={option.primary ?? false}
          />
        );
      default:
        return null;
    }
  });

  return (
    <>
      {leadCommunication && <LeadForm communication={leadCommunication} onClose={closeLeadForm} />}
      {buttons}
    </>
  );
};

export default ActionList;
