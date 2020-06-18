import React, { useState, useCallback } from 'react';

import Modal from '../Modal';
import Content from '../Content';
import Repeat from '../Repeat';
import LogoBox from '../LogoBox';
import InputLabel from '../InputLabel';
import InputText from '../InputText';
import InputSelect, { OptionProps } from '../InputSelect';
import { InputGroup, InputGroupColumn } from '../InputGroup';
import { ButtonPrimary, ButtonContent } from '../Button';
import { ContentLogo, ContentLogoText, ContentLogoMedia } from '../ContentLogo';
import { DrivingDistance } from '../../@types/gql/globalTypes';
import useInsuranceCalculation from '../../hooks/useInsurance';
import { ssnIsValid } from '../../utils/ssn';
import { Spinner } from '../Loader/wrapper';
import { numberSeparator } from '../../utils/formats';
import { SearchItem_vehicle_insuranceOptions } from '../../@types/gql/SearchItem';

interface FormData {
  ssn: string;
  drivingDistance: DrivingDistance;
}

interface InsuranceOptionModal {
  id: string;
  onClose: () => void;
  insuranceOptions: SearchItem_vehicle_insuranceOptions;
}

const InsuranceOptionModal = ({ id, onClose, insuranceOptions }: InsuranceOptionModal) => {
  const [form, setForm] = useState<FormData>({
    ssn: '',
    drivingDistance: DrivingDistance.BETWEEN0AND1000,
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
    { value: DrivingDistance.BETWEEN0AND1000, displayName: '0 - 1000' },
    { value: DrivingDistance.BETWEEN1000AND1500, displayName: '1000 - 1500' },
    { value: DrivingDistance.BETWEEN1500AND2000, displayName: '1500 - 2000' },
    { value: DrivingDistance.BETWEEN2000AND2500, displayName: '2000 - 2500' },
    { value: DrivingDistance.OVER2500, displayName: '2500+' },
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
        <Repeat tiny>
          <ButtonPrimary
            fullWidth
            disabled={!ssnIsValid(form.ssn) || loading}
            onClick={onShowInsurances}
          >
            <ButtonContent>Visa försäkringar</ButtonContent>
          </ButtonPrimary>
        </Repeat>
        <Repeat tiny>
          <div>Checkbox</div>
        </Repeat>
        <Repeat tiny>
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
              <div key={insurance.name}>
                <p>
                  <b>
                    {numberSeparator(insurance.price)} {insurance.unit}
                  </b>
                </p>
                <p>{insurance.name}</p>
              </div>
            ))}
          </Repeat>
        )}
      </>
    </Modal>
  );
};

export default InsuranceOptionModal;
