import React, { useState, useCallback } from 'react';

import Modal from '../Modal';
import Content from '../Content';
import { DrivingDistance } from '../../@types/gql/globalTypes';
import SortSelect, { OptionProps } from '../SortSelect';
import useInsuranceCalculation from '../../hooks/useInsurance';
import { ssnIsValid } from '../../utils/ssn';
import { Spinner } from '../Loader/wrapper';
import { numberSeparator } from '../../utils/formats';

interface FormData {
  ssn: string;
  drivingDistance: DrivingDistance;
}

interface InsuranceOptionModal {
  id: string;
  onClose: () => void;
}

const InsuranceOptionModal = ({ id, onClose }: InsuranceOptionModal) => {
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
      <Content>
        <p>
          <b>Personnummer</b>
        </p>
        <input value={form.ssn} onChange={onChangeSsn} />

        <p>
          <b>Uppskattad körsträcka per år</b>
        </p>
        <SortSelect
          value={form.drivingDistance}
          onChange={onChangeDrivingDistance}
          options={options}
          unit="mil"
        />

        {loading && <Spinner />}

        <button disabled={!ssnIsValid(form.ssn) || loading} onClick={onShowInsurances}>
          Visa försäkringar
        </button>

        <>
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
        </>
      </Content>
    </Modal>
  );
};

export default InsuranceOptionModal;
