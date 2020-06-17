import React, { useState, useCallback } from 'react';

import { SearchItem_vehicle_financialOptions } from '../../@types/gql/SearchItem';
import useLoanCalculation from '../../hooks/useLoan';
import Modal from '../Modal';
import { ModalFoldout, ModalFoldoutHeader, ModalFoldoutBody } from '../Modal/wrapper';
import Content from '../Content';
import LogoBox from '../LogoBox';
import Repeat from '../Repeat';
import RangeSliderSimple from '../RangeSlider/RangeSliderSimple';
import RangeSliderLabel from '../RangeSliderLabel';
import { numberSeparator } from '../../utils/formats';
import { ButtonClear, ButtonContent } from '../Button';
import { ContentLogo, ContentLogoText, ContentLogoMedia } from '../ContentLogo';
import DataList from '../DataList';

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
  const [extend, setExtend] = React.useState(false);
  const onToggleExtend = React.useCallback(() => setExtend(!extend), [extend]);

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
      <Repeat>
        <ContentLogo>
          {financialOption?.description && (
            <ContentLogoText>
              <Content>
                <p>{financialOption.description}</p>
              </Content>
            </ContentLogoText>
          )}
          {financialOption?.image && (
            <ContentLogoMedia>
              <LogoBox logo={financialOption.image} alt={financialOption.name || 'Logotyp'} wide />
            </ContentLogoMedia>
          )}
        </ContentLogo>
      </Repeat>
      <Repeat>
        <Repeat small>
          <Repeat tiny>
            <RangeSliderLabel
              label="Kontantinsatts"
              value={`${numberSeparator(downPaymentCurrent)} kr`}
            />
          </Repeat>
          <Repeat tiny>
            <RangeSliderSimple
              loading={loading}
              values={[downPaymentCurrent]}
              domain={[downPaymentMin, downPaymentMax]}
              steps={downPaymentSteps}
              onChange={onDownPaymentChange}
              unit="kr"
              formatValues
            />
          </Repeat>
        </Repeat>
        <Repeat small>
          <Repeat tiny>
            <RangeSliderLabel label="Avbetalning" value={`${durationCurrent} mån`} />
          </Repeat>
          <Repeat tiny>
            <RangeSliderSimple
              loading={loading}
              values={[durationCurrent]}
              domain={[durationMin, durationMax]}
              steps={durationSteps}
              onChange={onDurationChange}
              unit="mån"
            />
          </Repeat>
        </Repeat>
        <Repeat small>
          <RangeSliderLabel label="Restskuld" value={`${residualText} %`} />
        </Repeat>
        <Repeat small>
          <Repeat tiny>
            <RangeSliderLabel
              label="Din kostnad"
              value={`${numberSeparator(loan?.monthlyCost || 0)} kr/mån*`}
              highlight
            />
          </Repeat>
          <Repeat tiny>
            <Content small>
              <p>{`*Beräknat på ${interestText} % ränta (effektivt ${effectiveInterestText} %) och en årlig körsträcka om ${loan?.mileage} mil.`}</p>
            </Content>
          </Repeat>
        </Repeat>
        {!extend ? (
          <Repeat small>
            <ButtonClear onClick={onToggleExtend} title="Se mer information">
              <ButtonContent>Mer information</ButtonContent>
            </ButtonClear>
          </Repeat>
        ) : (
          <ModalFoldout>
            <ModalFoldoutHeader>
              <ButtonClear onClick={onToggleExtend} title="Dölj information">
                <ButtonContent>Dölj</ButtonContent>
              </ButtonClear>
            </ModalFoldoutHeader>
            <ModalFoldoutBody>
              <DataList
                items={[
                  {
                    label: 'Ränta',
                    value: `${interestText} %`,
                  },
                  {
                    label: 'Effektiv ränta',
                    value: `${effectiveInterestText} %`,
                  },
                  {
                    label: 'Uppläggningskostnad',
                    value: `${numberSeparator(financialOption?.setupFee || 0)} kr`,
                  },
                  {
                    label: 'Administrativa avgifter',
                    value: `${numberSeparator(financialOption?.administrationFee || 0)} kr/mån`,
                  },
                  {
                    label: 'Total kreditkostnad',
                    value: `${numberSeparator(loan?.totalCreditCost || 0)} kr`,
                  },
                ]}
              />
            </ModalFoldoutBody>
          </ModalFoldout>
        )}
      </Repeat>
    </Modal>
  );
};

export default LoanModal;
