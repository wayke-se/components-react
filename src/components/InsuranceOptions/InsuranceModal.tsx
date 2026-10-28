import React, { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { InsuranceProvider } from '../../Gql/ad/types';
import useInsuranceInquiry, { DrivingDistance } from '../../Gql/ad/useInsuranceInquiry';
import { adEvent, str } from '../../Gql/ad/view';
import useAdContext from '../../State/Ad/AdContext';
import useSettings from '../../State/Settings/useSettings';
import { numberSeparator } from '../../utils/formats';
import PubSub from '../../utils/pubsub/pubsub';
import { ssnIsValid } from '../../utils/ssn';
import { ButtonContent, ButtonInline, ButtonPrimary } from '../Button';
import { ColumnRow, ColumnRowItem } from '../ColumnRow';
import Content from '../Content';
import { ContentLogo, ContentLogoMedia, ContentLogoText } from '../ContentLogo';
import DetailBox from '../DetailBox';
import ExtendInfo from '../ExtendInfo';
import { H4 } from '../Heading';
import { InputGroup, InputGroupColumn } from '../InputGroup';
import InputLabel from '../InputLabel';
import InputSelect, { OptionProps } from '../InputSelect';
import InputText from '../InputText';
import Loader from '../Loader';
import LogoBox from '../LogoBox';
import Modal from '../Modal';
import { Repeat, RepeatSmall, RepeatTiny } from '../Repeat';
import Snackbar from '../Snackbar';
import { UtilityTextBold } from '../Utility';

interface FormData {
  ssn: string;
  drivingDistance: DrivingDistance;
}

interface InsuranceModalProps {
  onClose: () => void;
  provider: InsuranceProvider;
}

const InsuranceModal = ({ onClose, provider }: InsuranceModalProps) => {
  const { t } = useTranslation();
  const ad = useAdContext();
  const { publicApi } = useSettings();
  const [form, setForm] = useState<FormData>({
    ssn: '',
    drivingDistance: 'BETWEEN_0_AND_1000',
  });
  const [payload, setPayload] = useState<FormData>();
  const { loading, insurances, error } = useInsuranceInquiry(
    publicApi,
    ad.id,
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

  const trackPayload = useMemo(() => adEvent(ad), [ad]);

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
    { value: 'BETWEEN_0_AND_1000', displayName: '0 - 1000' },
    { value: 'BETWEEN_1000_AND_1500', displayName: '1000 - 1500' },
    { value: 'BETWEEN_1500_AND_2000', displayName: '1500 - 2000' },
    { value: 'BETWEEN_2000_AND_2500', displayName: '2000 - 2500' },
    { value: 'OVER_2500', displayName: '2500+' },
  ];

  return (
    <Modal title={t('item.insurance')} onClose={onClose}>
      {(provider.description || provider.logo) && (
        <Repeat>
          {provider.description ? (
            <ContentLogo>
              <ContentLogoText>
                <Content>
                  <p>{provider.description}</p>
                </Content>
              </ContentLogoText>
              {provider.logo && (
                <ContentLogoMedia>
                  <LogoBox logo={provider.logo} alt={provider.title || t('common.logotype')} wide />
                </ContentLogoMedia>
              )}
            </ContentLogo>
          ) : (
            <>
              {provider.logo && (
                <LogoBox logo={provider.logo} alt={provider.title || t('common.logotype')} wide />
              )}
            </>
          )}
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
        {insurances && (
          <Repeat>
            {insurances.map((insurance) => (
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
                      {str(insurance.details?.terms) && (
                        <RepeatTiny>
                          <ButtonInline
                            as="a"
                            href={insurance.details.terms || ''}
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
                  {insurance.insuranceItems.length > 0 && (
                    <Repeat>
                      <H4>{t('item.insuranceIncludes')}</H4>
                      {insurance.insuranceItems.map((item) => (
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
                                +{addon.price} {insurance.unit}
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
