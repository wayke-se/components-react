import React, { useState, useCallback } from 'react';

import Modal from '../Modal';
import Content from '../Content';
import Repeat from '../Repeat';
import LogoBox from '../LogoBox';
import DetailBox from '../DetailBox';
import InputLabel from '../InputLabel';
import InputText from '../InputText';
import InputCheckbox from '../InputCheckbox';
import InputSelect, { OptionProps } from '../InputSelect';
import { InputGroup, InputGroupColumn } from '../InputGroup';
import { ButtonPrimary, ButtonContent } from '../Button';
import { ContentLogo, ContentLogoText, ContentLogoMedia } from '../ContentLogo';
import { ColumnRow, ColumnRowItem } from '../ColumnRow';
import useInsuranceCalculation from '../../hooks/useInsurance';
import { ssnIsValid } from '../../utils/ssn';
import { Spinner } from '../Loader/wrapper';
import { numberSeparator } from '../../utils/formats';
import { DrivingDistance, InsuranceOption } from '../../@types/codegen/types';

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
  const { loading, data } = useInsuranceCalculation(
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

  const onShowInsurances = useCallback(() => setPayload(form), [form]);

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
        <Repeat small>
          <InputCheckbox id="input-insurance-save-personalnumber">
            Spara personnummer på denna enhet
          </InputCheckbox>
        </Repeat>
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
                          <a
                            href={insurance.url || ''}
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                          >
                            Förköpsinformation och villkor (öppnas i ny flik)
                          </a>
                        </Repeat>
                      )}
                    </>
                  </Repeat>
                  <Repeat>
                    <div>Välj till</div>
                    <ColumnRow>
                      <ColumnRowItem>Item</ColumnRowItem>
                      <ColumnRowItem>Item</ColumnRowItem>
                    </ColumnRow>
                  </Repeat>
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
