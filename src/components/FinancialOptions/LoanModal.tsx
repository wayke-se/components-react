import React, { useState, useCallback } from 'react';

import { SearchItem_vehicle_financialOptions } from '../../@types/gql/SearchItem';
import useLoanCalculation from '../../hooks/useLoan';
import Modal from '../Modal';
import Content from '../Content';
import RangeSliderSimple from '../RangeSlider/RangeSliderSimple';
import { numberSeparator } from '../../utils/formats';

const stepGenerator = (
  step: number,
  max: number,
  steps: number[] = [],
  current?: number
): number[] => {
  if (current && current >= max) {
    return steps;
  }

  const nextCurrent = current ? step + current : step;
  steps.push(nextCurrent);
  return stepGenerator(step, max, steps, nextCurrent);
};

interface LoanModalProps {
  id: string;
  financialOption: SearchItem_vehicle_financialOptions;
  onClose: () => void;
}

const LoanModal = ({ id, financialOption, onClose }: LoanModalProps) => {
  const [variables, setVariables] = useState({
    duration: financialOption.duration?.current,
    downPayment: financialOption.downPayment?.current,
    residual: financialOption.residual?.current,
  });

  const { duration, downPayment, residual } = variables;
  const { loading, data } = useLoanCalculation(id, duration, downPayment, residual);
  const loan = data?.loan;

  const downPaymentCurrent = loan?.downPayment?.current || 0;
  const downPaymentMin = loan?.downPayment?.min || 0;
  const downPaymentMax = loan?.downPayment?.max || 0;
  const downPaymentStep = loan?.downPayment?.step || 0;
  const downPaymentSteps = stepGenerator(downPaymentStep, downPaymentMax);
  const onDownPaymentChange = useCallback(
    (values: readonly number[]) => setVariables({ ...variables, downPayment: values[0] }),
    [variables]
  );

  const durationCurrent = loan?.duration?.current || 0;
  const durationMin = loan?.duration?.min || 0;
  const durationMax = loan?.duration?.max || 0;
  const durationStep = loan?.duration?.step || 0;
  const durationSteps = stepGenerator(durationStep, durationMax);
  const onDurationChange = useCallback(
    (values: readonly number[]) => setVariables({ ...variables, duration: values[0] }),
    [variables]
  );

  const residualText = ((loan?.residual?.current || 0) * 100).toFixed(2);
  const interestText = ((loan?.interest || 0) * 100).toFixed(2);
  const effectiveInterestText = ((loan?.effectiveInterest || 0) * 100).toFixed(2);

  return (
    <Modal title="Lånealternativ" onClose={onClose}>
      <Content>
        <p>Kontantinsatts: {numberSeparator(downPaymentCurrent)} kr</p>
        <RangeSliderSimple
          loading={loading}
          values={[downPaymentCurrent]}
          domain={[downPaymentMin, downPaymentMax]}
          steps={downPaymentSteps}
          onChange={onDownPaymentChange}
          unit="kr"
          formatValues
        />

        <p>Avbetalning: {durationCurrent} mån</p>
        <RangeSliderSimple
          loading={loading}
          values={[durationCurrent]}
          domain={[durationMin, durationMax]}
          steps={durationSteps}
          onChange={onDurationChange}
          unit="mån"
        />

        <p>Restskuld: {residualText}%</p>

        <p>
          <b>{numberSeparator(loan?.monthlyCost || 0)} kr/mån</b>
        </p>
        <p>{`*Beräknat på ${interestText}% ränta (effektivt ${effectiveInterestText}%) och en årlig körsträcka om ${loan?.mileage} mil.`}</p>
      </Content>
    </Modal>
  );
};

export default LoanModal;
