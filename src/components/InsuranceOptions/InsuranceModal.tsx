import React, { useState, useCallback, useMemo } from 'react';

import Modal from '../Modal';
import Content from '../Content';
import { Repeat, RepeatTiny, RepeatSmall } from '../Repeat';
import LogoBox from '../LogoBox';
import DetailBox from '../DetailBox';
import ExtendInfo from '../ExtendInfo';
import Snackbar from '../Snackbar';
import { UtilityTextBold } from '../Utility';
import InputLabel from '../InputLabel';
import InputText from '../InputText';
import InputCheckbox from '../InputCheckbox';
import InputSelect, { OptionProps } from '../InputSelect';
import { H4 } from '../Heading';
import { InputGroup, InputGroupColumn } from '../InputGroup';
import { ButtonPrimary, ButtonContent, ButtonInline } from '../Button';
import { ContentLogo, ContentLogoText, ContentLogoMedia } from '../ContentLogo';
import { ColumnRow, ColumnRowItem } from '../ColumnRow';
import useInsuranceCalculation from '../../hooks/useInsurance';
import { ssnIsValid } from '../../utils/ssn';
import Loader from '../Loader';
import { numberSeparator } from '../../utils/formats';
import { DrivingDistance, InsuranceOption, Branch } from '../../@types/codegen/types';
import PubSub from '../../utils/pubsub/pubsub';
import { useTranslation } from 'react-i18next';

interface FormData {
  ssn: string;
  drivingDistance: DrivingDistance;
}

interface InsuranceModal {
  id: string;
  branch?: Branch | null;
  onClose: () => void;
  insuranceOptions: InsuranceOption;
}

const InsuranceModal = ({ id, branch, onClose, insuranceOptions }: InsuranceModal) => {
  const { t } = useTranslation();
  const [form, setForm] = useState<FormData>({
    ssn: '',
    drivingDistance: DrivingDistance.Between0And1000,
  });
  const [payload, setPayload] = useState<FormData>();
  const { loading, data, error } = useInsuranceCalculation(
    id,
    branch?.id ? branch?.id : undefined,
    ssnIsValid(payload?.ssn) ? payload?.ssn : undefined,
    payload?.drivingDistance
  );

  const onChangeSsn = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, ssn: e.currentTarget.value }),
    [form]
  );

  const onChangeDrivingDistance = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) =>
      setForm({ ...form, drivingDistance: e.currentTarget.value as DrivingDistance }),
    [form]
  );

  const trackPayload = useMemo(
    () => ({ branchId: branch?.id, branchName: branch?.name }),
    [branch]
  );

  const onShowInsurances = useCallback(() => {
    PubSub.publish('InsuranceInterest', trackPayload);
    setPayload(form);
  }, [form, trackPayload]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.keyCode === 13 && ssnIsValid(form.ssn) && !loading) {
        onShowInsurances();
      }
    },
    [form]
  );

  const options: OptionProps[] = [
    { value: DrivingDistance.Between0And1000, displayName: '0 - 1000' },
    { value: DrivingDistance.Between1000And1500, displayName: '1000 - 1500' },
    { value: DrivingDistance.Between1500And2000, displayName: '1500 - 2000' },
    { value: DrivingDistance.Between2000And2500, displayName: '2000 - 2500' },
    { value: DrivingDistance.Over2500, displayName: '2500+' },
  ];

  return (
    <Modal title={t('item.insurance')} onClose={onClose}>
      {(insuranceOptions?.description || insuranceOptions?.logotype) && (
        <Repeat>
          <ContentLogo>
            {insuranceOptions.description && (
              <ContentLogoText>
                <Content>
                  <p>{insuranceOptions.description}</p>
                </Content>
              </ContentLogoText>
            )}
            {insuranceOptions.logotype && (
              <ContentLogoMedia>
                <LogoBox
                  logo={insuranceOptions.logotype}
                  alt={insuranceOptions.name || t('common.logotype')}
                  wide
                />
              </ContentLogoMedia>
            )}
          </ContentLogo>
        </Repeat>
      )}

      <Repeat>
        <RepeatSmall>
          <RepeatTiny>
            <InputGroup>
              <InputGroupColumn>
                <InputLabel htmlFor="input-insurance-personalnumber">
                  {t('item.personalNumber')}
                </InputLabel>
                <InputText
                  placeholder="ÅÅÅÅMMDD-XXXX"
                  label={t('item.personalNumber')}
                  value={form.ssn}
                  onChange={onChangeSsn}
                  onKeyDown={onKeyDown}
                  id="input-insurance-personalnumber"
                />
              </InputGroupColumn>
              <InputGroupColumn>
                <InputLabel htmlFor="input-insurance-mileage">
                  {t('item.estimatedAnualMileage')}
                </InputLabel>
                <InputSelect
                  value={form.drivingDistance}
                  onChange={onChangeDrivingDistance}
                  options={options}
                  unit="mil"
                  title={t('item.estimatedAnualMileage')}
                />
              </InputGroupColumn>
            </InputGroup>
          </RepeatTiny>
          <RepeatTiny>
            <ButtonPrimary
              fullWidth
              disabled={!ssnIsValid(form.ssn) || loading}
              onClick={onShowInsurances}
            >
              <ButtonContent>{t('item.showInsurances')}</ButtonContent>
            </ButtonPrimary>
          </RepeatTiny>
        </RepeatSmall>
        {false && (
          <RepeatSmall>
            <InputCheckbox id="input-insurance-save-personalnumber">
              {t('item.savePersonalNumberOnThisDevice')}
            </InputCheckbox>
          </RepeatSmall>
        )}
        <RepeatSmall>
          <Content small>
            <p>{t('item.savePersonalNumberOnThisDeviceHelp')}</p>
          </Content>
        </RepeatSmall>
      </Repeat>

      {loading && (
        <Repeat>
          <Loader />
        </Repeat>
      )}

      {error && (
        <Repeat>
          <Snackbar severity="error" icon heading={t('common.anErrorHasOccured') || undefined}>
            {t('item.couldNotfetchInsurances')}
          </Snackbar>
        </Repeat>
      )}

      <>
        {data?.insurances && (
          <Repeat>
            {data?.insurances.map((insurance) => (
              <Repeat key={insurance.name}>
                <DetailBox
                  heading={`${numberSeparator(insurance.price)} ${insurance.unit}`}
                  description={insurance.name}
                >
                  <Repeat>
                    <>
                      {insurance.description && (
                        <RepeatTiny>
                          <Content>
                            <p>{insurance.description}</p>
                          </Content>
                        </RepeatTiny>
                      )}
                    </>
                    <>
                      {insurance.url && (
                        <RepeatTiny>
                          <ButtonInline
                            as="a"
                            href={insurance.url || ''}
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            title={t('item.openPrePurchaseInformationInNewTab') || ''}
                          >
                            {t('item.openPrePurchaseInformationInNewTab')}
                          </ButtonInline>
                        </RepeatTiny>
                      )}
                    </>
                  </Repeat>
                  {insurance.items && insurance.items.length > 0 && (
                    <Repeat>
                      <H4>{t('item.insuranceIncludes')}</H4>
                      {insurance.items.map((item) => (
                        <RepeatSmall key={item.name || ''}>
                          <ExtendInfo title={item.name || ''}>{item.description}</ExtendInfo>
                        </RepeatSmall>
                      ))}
                    </Repeat>
                  )}
                  {insurance.addons && insurance.addons.length > 0 && (
                    <Repeat>
                      <H4>{t('item.addInsuranceHeading')}</H4>
                      {insurance.addons.map((addon) => (
                        <RepeatSmall key={addon.title || ''}>
                          <ColumnRow>
                            <ColumnRowItem>
                              <ExtendInfo title={addon.title || ''}>{addon.description}</ExtendInfo>
                            </ColumnRowItem>
                            <ColumnRowItem>
                              <UtilityTextBold>
                                +{addon.price} {addon.unit}
                              </UtilityTextBold>
                            </ColumnRowItem>
                          </ColumnRow>
                        </RepeatSmall>
                      ))}
                    </Repeat>
                  )}
                </DetailBox>
              </Repeat>
            ))}
          </Repeat>
        )}
      </>
    </Modal>
  );
};

export default InsuranceModal;
