import React, { useCallback, useId, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Branch, Maybe } from '../../@types/codegen/types';
import { MarketCode } from '../../@types/market';
import useSubmitLead, { LeadCommunication } from '../../hooks/useSubmitLead';
import useSettings from '../../State/Settings/useSettings';
import PubSub from '../../utils/pubsub/pubsub';
import { ButtonContent, ButtonPrimary, ButtonSecondary } from '../Button';
import Content from '../Content';
import InputCheckbox from '../InputCheckbox';
import InputError from '../InputError';
import InputLabel from '../InputLabel';
import InputText from '../InputText';
import InputTextarea from '../InputTextarea';
import Modal from '../Modal';
import { Repeat, RepeatSmall, RepeatTiny } from '../Repeat';
import { Field } from './wrapper';

export type { LeadCommunication };

interface LeadFormProps {
  id: string;
  branch?: Maybe<Branch>;
  marketCode?: MarketCode;
  communication: LeadCommunication;
  onClose: () => void;
}

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  message: string;
  tradeInCar: boolean;
  tradeInCarRegNo: string;
  tradeInCarMileage: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  message: '',
  tradeInCar: false,
  tradeInCarRegNo: '',
  tradeInCarMileage: '',
};

const MAX_MESSAGE_LENGTH = 500;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Swedish plates: three letters, two digits and a final digit or letter (I, Q and V are unused).
// Norwegian plates: two letters followed by five digits.
const registrationNumberPatterns: Partial<Record<MarketCode, RegExp>> = {
  SE: /^[A-HJ-PR-UW-Z]{3}[0-9]{2}[0-9A-HJ-PR-UW-Z]$/,
  NO: /^[A-Z]{2}[0-9]{5}$/,
};

export const normalizeRegistrationNumber = (value: string) =>
  value.replace(/[\s-]/g, '').toUpperCase();

const isValidRegistrationNumber = (value: string, marketCode: MarketCode) => {
  const pattern = registrationNumberPatterns[marketCode];
  return !pattern || pattern.test(normalizeRegistrationNumber(value));
};

const LeadForm = ({ id, branch, marketCode = 'SE', communication, onClose }: LeadFormProps) => {
  const { t } = useTranslation();
  const { apiUrl } = useSettings();
  const { submitLead, isLoading } = useSubmitLead(apiUrl, marketCode);
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState(false);
  const [sent, setSent] = useState(false);

  const formId = useId();
  const fieldId = (name: keyof FormValues) => `${formId}-${name}`;
  const errorId = (name: keyof FormValues) => `${formId}-${name}-error`;

  const title = communication === 'email' ? t('lead.messageFormTitle') : t('lead.callFormTitle');

  const trackPayload = useMemo(
    () => ({ id, branchId: branch?.id, branchName: branch?.name, communication }),
    [id, branch, communication]
  );

  const setValue = useCallback(<K extends keyof FormValues>(name: K, value: FormValues[K]) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
  }, []);

  const validate = useCallback(
    (v: FormValues): FormErrors => {
      const next: FormErrors = {};
      if (!v.firstName.trim()) next.firstName = t('lead.validationMessages.requiredFirstName');
      if (!v.lastName.trim()) next.lastName = t('lead.validationMessages.requiredLastName');
      if (communication === 'email') {
        if (!v.email.trim()) next.email = t('lead.validationMessages.requiredEmail');
        else if (!EMAIL_PATTERN.test(v.email.trim()))
          next.email = t('lead.validationMessages.invalidEmail');
      }
      if (communication === 'callme' && !v.phoneNumber.trim()) {
        next.phoneNumber = t('lead.validationMessages.requiredPhoneNumber');
      }
      if (v.message.length > MAX_MESSAGE_LENGTH) {
        next.message = t('lead.validationMessages.maxMessage');
      }
      if (v.tradeInCar) {
        if (!v.tradeInCarRegNo.trim()) {
          next.tradeInCarRegNo = t('lead.validationMessages.requiredRegNo');
        } else if (!isValidRegistrationNumber(v.tradeInCarRegNo, marketCode)) {
          next.tradeInCarRegNo = t('lead.validationMessages.invalidRegNo');
        }
        if (!v.tradeInCarMileage.trim()) {
          next.tradeInCarMileage = t('lead.validationMessages.requiredMileage');
        }
      }
      return next;
    },
    [communication, marketCode, t]
  );

  const onSubmit = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault();
      const branchId = branch?.id;
      if (!branchId || isLoading) return;

      const nextErrors = validate(values);
      setErrors(nextErrors);
      if (Object.keys(nextErrors).length > 0) return;

      setSubmitError(false);
      try {
        await submitLead({
          itemId: id,
          branchId,
          communication,
          firstName: values.firstName.trim(),
          lastName: values.lastName.trim(),
          email: communication === 'email' ? values.email.trim() : undefined,
          phoneNumber: communication === 'callme' ? values.phoneNumber.trim() : undefined,
          message: values.message.trim(),
          tradeInCarRegNo: values.tradeInCar
            ? normalizeRegistrationNumber(values.tradeInCarRegNo)
            : undefined,
          tradeInCarMileage: values.tradeInCar ? values.tradeInCarMileage.trim() : undefined,
        });
        PubSub.publish('LeadSent', trackPayload);
        setSent(true);
      } catch {
        setSubmitError(true);
      }
    },
    [branch, id, communication, values, validate, submitLead, isLoading, trackPayload]
  );

  if (sent) {
    return (
      <Modal title={t('lead.confirmationTitle')} onClose={onClose}>
        <Repeat>
          <Content>
            <p>{t('lead.confirmationMessage')}</p>
          </Content>
        </Repeat>
        <Repeat>
          <ButtonPrimary onClick={onClose}>
            <ButtonContent>{t('lead.confirmationClose')}</ButtonContent>
          </ButtonPrimary>
        </Repeat>
      </Modal>
    );
  }

  const textField = (
    name:
      | 'firstName'
      | 'lastName'
      | 'email'
      | 'phoneNumber'
      | 'tradeInCarRegNo'
      | 'tradeInCarMileage',
    label: string,
    inputProps?: Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>
  ) => (
    <RepeatTiny>
      <Field>
        <InputLabel htmlFor={fieldId(name)}>{label}</InputLabel>
        <InputText
          id={fieldId(name)}
          label={label}
          value={values[name]}
          onChange={(e) => setValue(name, e.currentTarget.value)}
          disabled={isLoading}
          aria-required
          aria-invalid={!!errors[name]}
          aria-describedby={errors[name] ? errorId(name) : undefined}
          {...inputProps}
        />
        {errors[name] && <InputError id={errorId(name)}>{errors[name]}</InputError>}
      </Field>
    </RepeatTiny>
  );

  return (
    <Modal title={title} onClose={onClose}>
      <form onSubmit={onSubmit} noValidate>
        <Repeat>
          <RepeatSmall>
            {textField('firstName', t('lead.firstName'), { autoComplete: 'given-name' })}
            {textField('lastName', t('lead.lastName'), { autoComplete: 'family-name' })}
            {communication === 'email' &&
              textField('email', t('lead.email'), { type: 'email', autoComplete: 'email' })}
            {communication === 'callme' &&
              textField('phoneNumber', t('lead.phoneNumber'), { type: 'tel', autoComplete: 'tel' })}
            <RepeatTiny>
              <Field>
                <InputLabel htmlFor={fieldId('message')}>{t('lead.message')}</InputLabel>
                <InputTextarea
                  id={fieldId('message')}
                  label={t('lead.message')}
                  value={values.message}
                  maxLength={MAX_MESSAGE_LENGTH}
                  onChange={(e) => setValue('message', e.currentTarget.value)}
                  disabled={isLoading}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? errorId('message') : undefined}
                />
                {errors.message && (
                  <InputError id={errorId('message')}>{errors.message}</InputError>
                )}
              </Field>
            </RepeatTiny>
            <RepeatTiny>
              <InputCheckbox
                id={fieldId('tradeInCar')}
                checked={values.tradeInCar}
                disabled={isLoading}
                onChange={(e) => setValue('tradeInCar', e.currentTarget.checked)}
              >
                {t('lead.tradeInCar')}
              </InputCheckbox>
            </RepeatTiny>
            {values.tradeInCar && (
              <>
                {textField('tradeInCarRegNo', t('lead.registrationNumber'), {
                  autoCapitalize: 'characters',
                })}
                {textField('tradeInCarMileage', t('lead.mileage'), { inputMode: 'numeric' })}
              </>
            )}
          </RepeatSmall>
          {submitError && (
            <RepeatSmall>
              <InputError>{t('lead.error')}</InputError>
            </RepeatSmall>
          )}
          <RepeatSmall>
            <ButtonPrimary type="submit" disabled={isLoading} onClick={() => onSubmit()}>
              <ButtonContent>{t('lead.send')}</ButtonContent>
            </ButtonPrimary>{' '}
            <ButtonSecondary onClick={onClose} disabled={isLoading}>
              <ButtonContent>{t('lead.close')}</ButtonContent>
            </ButtonSecondary>
          </RepeatSmall>
        </Repeat>
      </form>
    </Modal>
  );
};

export default LeadForm;
