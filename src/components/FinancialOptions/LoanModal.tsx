import React, { useState, useCallback, useEffect } from 'react';

import useLoanCalculation from '../../hooks/useLoan';
import Modal from '../Modal/index';
import { ModalFoldout, ModalFoldoutBody } from '../Modal/wrapper';
import Content from '../Content/index';
import LogoBox from '../LogoBox/index';
import { Repeat, RepeatSmall, RepeatTiny } from '../Repeat/index';
import RangeSliderSimple from '../RangeSlider/RangeSliderSimple';
import RangeSliderLabel from '../RangeSliderLabel/index';
import { numberSeparator } from '../../utils/formats';
import { ButtonClear, ButtonContent } from '../Button/index';
import { ContentLogo, ContentLogoText, ContentLogoMedia } from '../ContentLogo/index';
import DataList from '../DataList/index';
import { FinancialOption, Query } from '../../@types/codegen/types';
import PubSub from '../../utils/pubsub/pubsub';

const stepGenerator = (
  step: number,
  max: number,
  steps: number[] = [],
  current?: number
): number[] => {
  if (current !== undefined && current >= max) {
    return steps;
  }

  const nextCurrent = current ? step + current : step;
  steps.push(nextCurrent);
  return stepGenerator(step, max, steps, nextCurrent);
};

interface LoanModalProps {
  id: string;
  financialOption: FinancialOption;
  onClose: () => void;
}

const LoanModal = ({ id, financialOption, onClose }: LoanModalProps) => {
  const [tmp, setTmp] = useState<Query>();
  const [extend, setExtend] = React.useState(false);
  const onToggleExtend = React.useCallback(() => {
    if (!extend) {
      PubSub.publish('FinanceInterest');
    }
    setExtend(!extend);
  }, [extend]);

  const [variables, setVariables] = useState({
    duration: financialOption.duration?.current,
    downPayment: financialOption.downPayment?.current,
    residual: financialOption.residual?.current,
  });

  const { duration, downPayment, residual } = variables;
  const { loading, data } = useLoanCalculation(id, duration, downPayment, residual);
  useEffect(() => {
    if (data) {
      setTmp(data);
    }
  }, [data]);

  const loan = data?.loan || tmp?.loan;

  const downPaymentCurrent = loan?.downPayment?.current || 0;
  const downPaymentMin = loan?.downPayment?.min || 0;
  const downPaymentMax = loan?.downPayment?.max || 0;
  const downPaymentStep = loan?.downPayment?.step || 0;
  const downPaymentSteps = stepGenerator(downPaymentStep, downPaymentMax);
  const onDownPaymentChange = useCallback(
    (values: readonly number[]) => {
      PubSub.publish('FinanceInterest');
      setVariables({ ...variables, downPayment: values[0] });
    },
    [variables]
  );

  const durationCurrent = loan?.duration?.current || 0;
  const durationMin = loan?.duration?.min || 0;
  const durationMax = loan?.duration?.max || 0;
  const durationStep = loan?.duration?.step || 0;
  const durationSteps = stepGenerator(durationStep, durationMax);
  const onDurationChange = useCallback(
    (values: readonly number[]) => {
      PubSub.publish('FinanceInterest');
      setVariables({ ...variables, duration: values[0] });
    },
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
        <RepeatSmall>
          <RepeatTiny>
            <RangeSliderLabel
              label="Kontantinsatts"
              value={`${numberSeparator(downPaymentCurrent)} kr`}
            />
          </RepeatTiny>
          <RepeatTiny>
            <RangeSliderSimple
              loading={loading}
              values={[downPaymentCurrent]}
              domain={[downPaymentMin, downPaymentMax]}
              steps={downPaymentSteps}
              onChange={onDownPaymentChange}
              unit="kr"
              formatValues
            />
          </RepeatTiny>
        </RepeatSmall>
        <RepeatSmall>
          <RepeatTiny>
            <RangeSliderLabel label="Avbetalning" value={`${durationCurrent} mån`} />
          </RepeatTiny>
          <RepeatTiny>
            <RangeSliderSimple
              loading={loading}
              values={[durationCurrent]}
              domain={[durationMin, durationMax]}
              steps={durationSteps}
              onChange={onDurationChange}
              unit="mån"
            />
          </RepeatTiny>
        </RepeatSmall>
        {residual !== undefined && (
          <>
            <RepeatSmall>
              <RangeSliderLabel label="Restskuld" value={`${residualText} %`} />
            </RepeatSmall>
            <RepeatSmall>
              <RepeatTiny>
                <RangeSliderLabel
                  label="Din kostnad"
                  value={`${numberSeparator(loan?.monthlyCost || 0)} kr/mån*`}
                  highlight
                />
              </RepeatTiny>
              <RepeatTiny>
                <Content small>
                  <p>{`*Beräknat på ${interestText} % ränta (effektivt ${effectiveInterestText} %) och en årlig körsträcka om ${loan?.mileage} mil.`}</p>
                </Content>
              </RepeatTiny>
            </RepeatSmall>
          </>
        )}
        <RepeatSmall>
          <ButtonClear
            onClick={onToggleExtend}
            title={extend ? 'Visa mindre information' : 'Visa mer information'}
          >
            <ButtonContent>{extend ? 'Mindre information' : 'Mer information'}</ButtonContent>
          </ButtonClear>
        </RepeatSmall>
        <>
          {extend && (
            <ModalFoldout>
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
        </>
      </Repeat>
    </Modal>
  );
};

export default LoanModal;
