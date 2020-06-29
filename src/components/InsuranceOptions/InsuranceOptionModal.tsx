import React, { useState, useCallback } from 'react';

import Modal from '../Modal/index';
import Content from '../Content/index';
import Repeat from '../Repeat/index';
import LogoBox from '../LogoBox/index';
import DetailBox from '../DetailBox/index';
import ExtendInfo from '../ExtendInfo/index';
import Snackbar from '../Snackbar/index';
import { UtilityTextBold } from '../Utility/index';
import InputLabel from '../InputLabel/index';
import InputText from '../InputText/index';
import InputCheckbox from '../InputCheckbox/index';
import InputSelect, { OptionProps } from '../InputSelect/index';
import { H4 } from '../Heading/index';
import { InputGroup, InputGroupColumn } from '../InputGroup/index';
import { ButtonPrimary, ButtonContent, ButtonInline } from '../Button/index';
import { ContentLogo, ContentLogoText, ContentLogoMedia } from '../ContentLogo/index';
import { ColumnRow, ColumnRowItem } from '../ColumnRow/index';
import useInsuranceCalculation from '../../hooks/useInsurance';
import { ssnIsValid } from '../../utils/ssn';
import { Spinner } from '../Loader/wrapper';
import { numberSeparator } from '../../utils/formats';
import { DrivingDistance, InsuranceOption } from '../../@types/codegen/types';
import PubSub from '../../utils/pubsub/pubsub';

interface FormData {
  ssn: string;
  drivingDistance: DrivingDistance;
}

interface InsuranceOptionModal {
  id: string;
  onClose: () => void;
  insuranceOptions: InsuranceOption;
}

const InsuranceOptionModal = ({ id, onClose, insuranceOptions }: InsuranceOptionModal) => {
  const [form, setForm] = useState<FormData>({
    ssn: '',
    drivingDistance: DrivingDistance.Between0And1000,
  });
  const [payload, setPayload] = useState<FormData>();
  const { loading, data, error } = useInsuranceCalculation(
    id,
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

  const onShowInsurances = useCallback(() => {
    PubSub.publish('InsuranceInterest');
    setPayload(form);
  }, [form]);

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
    <Modal title="Försäkring" onClose={onClose}>
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
                  alt={insuranceOptions.name || 'Logotyp'}
                  wide
                />
              </ContentLogoMedia>
            )}
          </ContentLogo>
        </Repeat>
      )}

      <Repeat>
        <Repeat tiny>
          <InputGroup>
            <InputGroupColumn>
              <InputLabel htmlFor="input-insurance-personalnumber">Personnummer</InputLabel>
              <InputText
                placeholder="ÅÅÅÅMMDD-XXXX"
                label="Personnummer"
                value={form.ssn}
                onChange={onChangeSsn}
                onKeyDown={onKeyDown}
                id="input-insurance-personalnumber"
              />
            </InputGroupColumn>
            <InputGroupColumn>
              <InputLabel htmlFor="input-insurance-mileage">
                Uppskattad körsträcka per år
              </InputLabel>
              <InputSelect
                value={form.drivingDistance}
                onChange={onChangeDrivingDistance}
                options={options}
                unit="mil"
              />
            </InputGroupColumn>
          </InputGroup>
        </Repeat>
        <Repeat small>
          <ButtonPrimary
            fullWidth
            disabled={!ssnIsValid(form.ssn) || loading}
            onClick={onShowInsurances}
          >
            <ButtonContent>Visa försäkringar</ButtonContent>
          </ButtonPrimary>
        </Repeat>
        {false && (
          <Repeat small>
            <InputCheckbox id="input-insurance-save-personalnumber">
              Spara personnummer på denna enhet
            </InputCheckbox>
          </Repeat>
        )}
        <Repeat small>
          <Content small>
            <p>
              Spara personnummer på denna dator för att direkt visa försäkringskostnaderna i Wayke.
              Personnumret lagras inte hos Wayke utan finns bara sparad i din webbläsare.
            </p>
          </Content>
        </Repeat>
      </Repeat>

      {loading && (
        <Repeat>
          <Spinner />
        </Repeat>
      )}

      {error && (
        <Repeat>
          <Snackbar severity="error" icon heading="Ett fel har inträffat">
            Kunde inte hämta försäkringar. Vänligen försök igen.
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
                        <Repeat tiny>
                          <Content>
                            <p>{insurance.description}</p>
                          </Content>
                        </Repeat>
                      )}
                    </>
                    <>
                      {insurance.url && (
                        <Repeat tiny>
                          <ButtonInline
                            as="a"
                            href={insurance.url || ''}
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                          >
                            Förköpsinformation och villkor (öppnas i ny flik)
                          </ButtonInline>
                        </Repeat>
                      )}
                    </>
                  </Repeat>
                  {insurance.items && insurance.items.length > 0 && (
                    <Repeat>
                      <H4>Försäkringen innehåller</H4>
                      {insurance.items.map((item) => (
                        <Repeat small key={item.name || ''}>
                          <ExtendInfo title={item.name || ''}>{item.description}</ExtendInfo>
                        </Repeat>
                      ))}
                    </Repeat>
                  )}
                  {insurance.addons && insurance.addons.length > 0 && (
                    <Repeat>
                      <H4>Välj till</H4>
                      {insurance.addons.map((addon) => (
                        <Repeat small key={addon.title || ''}>
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
                        </Repeat>
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

export default InsuranceOptionModal;
