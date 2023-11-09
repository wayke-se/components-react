import React, { useState, useCallback, useEffect } from 'react';

import useLoanCalculation from '../../hooks/useLoan';
import Modal from '../Modal';
import { ModalFoldout, ModalFoldoutBody } from '../Modal/wrapper';
import Content from '../Content';
import LogoBox from '../LogoBox';
import { Repeat, RepeatSmall, RepeatTiny } from '../Repeat';
import { numberSeparator } from '../../utils/formats';
import { ButtonClear, ButtonContent } from '../Button';
import { ContentLogo, ContentLogoText, ContentLogoMedia } from '../ContentLogo';
import DataList from '../DataList';
import { FinancialOption, Query } from '../../@types/codegen/types';
import PubSub from '../../utils/pubsub/pubsub';
import SliderWithLabel from '../RangeSlider/SliderWithLabel';
import { useTranslation } from 'react-i18next';

const stepGenerator = (
  step: number,
  max: number,
  steps: number[] = [],
  current?: number
): number[] => {
  if (step === 0 && current === undefined) return steps;

  if (current !== undefined && current >= max && step !== 0) {
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
  const { t } = useTranslation();
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
      setVariables({
        duration: data?.loan?.duration?.current || 0,
        downPayment: data?.loan?.downPayment?.current || 0,
        residual: data?.loan?.residual?.current || 0,
      });
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

  const residualCurrent = (loan?.residual?.current || 0) * 100 || 0;
  const residualMin = (loan?.residual?.min || 0) * 100 || 0;
  const residualMax = (loan?.residual?.max || 0) * 100 || 0;
  const residualStep = (loan?.residual?.step || 0) * 100 || 0;
  const residualSteps = stepGenerator(residualStep, residualMax);
  const onResidualChange = useCallback(
    (values: readonly number[]) => {
      PubSub.publish('FinanceInterest');
      setVariables({ ...variables, residual: values[0] / 100 });
    },
    [variables]
  );

  const interestText = ((loan?.interest || 0) * 100).toFixed(2);
  const effectiveInterestText = ((loan?.effectiveInterest || 0) * 100).toFixed(2);
  const monthlyCost = loan?.monthlyCost;

  return (
    <Modal title={t('item.financialOptions.loanOptions')} onClose={onClose}>
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
              <LogoBox
                logo={financialOption.image}
                alt={financialOption.name || t('common.logotype')}
                wide
              />
            </ContentLogoMedia>
          )}
        </ContentLogo>
      </Repeat>
      <Repeat>
        <RepeatSmall>
          <SliderWithLabel
            label={t('item.financialOptions.downPayment')}
            values={[downPaymentCurrent]}
            domain={[downPaymentMin, downPaymentMax]}
            steps={downPaymentSteps}
            unit={t('currency.default')}
            formatValues
            loading={loading}
            onChange={onDownPaymentChange}
          />
        </RepeatSmall>
        <RepeatSmall>
          <SliderWithLabel
            label={t('item.financialOptions.duration')}
            values={[durationCurrent]}
            domain={[durationMin, durationMax]}
            steps={durationSteps}
            unit={t('item.financialOptions.months')}
            loading={loading}
            onChange={onDurationChange}
          />
        </RepeatSmall>
        {residual !== undefined && residualMax !== 0 && (
          <RepeatSmall>
            <SliderWithLabel
              label={t('item.financialOptions.residual')}
              values={[residualCurrent]}
              domain={[residualMin, residualMax]}
              steps={residualSteps}
              unit="%"
              loading={loading}
              onChange={onResidualChange}
            />
          </RepeatSmall>
        )}
        <RepeatSmall>
          <RepeatTiny>
            {monthlyCost !== null && monthlyCost !== undefined && (
              <Content>{`${numberSeparator(monthlyCost)} ${t('currency.monthly')}*`}</Content>
            )}
            <Content small>
              <p>
                *
                {loan?.mileage !== null
                  ? t('item.financialOptions.loanOptionsDisclaimerMileage', {
                      interest: interestText,
                      effectiveInterest: effectiveInterestText,
                      mileage: loan?.mileage,
                    })
                  : t('item.financialOptions.loanOptionsDisclaimer', {
                      interest: interestText,
                      effectiveInterest: effectiveInterestText,
                    })}
              </p>
            </Content>
          </RepeatTiny>
        </RepeatSmall>

        <RepeatSmall>
          <ButtonClear
            onClick={onToggleExtend}
            title={
              extend ? t('common.showLessInformation') || '' : t('common.showMoreInformation') || ''
            }
          >
            <ButtonContent>
              {extend ? t('common.lessInformation') : t('common.showMoreInformation')}
            </ButtonContent>
          </ButtonClear>
        </RepeatSmall>
        <>
          {extend && (
            <ModalFoldout>
              <ModalFoldoutBody>
                <DataList
                  items={[
                    {
                      label: t('item.financialOptions.interest'),
                      value: `${interestText} %`,
                    },
                    {
                      label: t('item.financialOptions.effectiveinterest'),
                      value: `${effectiveInterestText} %`,
                    },
                    {
                      label: t('item.financialOptions.setupFee'),
                      value: `${numberSeparator(financialOption?.setupFee || 0)} ${t(
                        'currency.default'
                      )}`,
                    },
                    {
                      label: t('item.financialOptions.administrationFee'),
                      value: `${numberSeparator(financialOption?.administrationFee || 0)} ${t(
                        'currency.monthly'
                      )}`,
                    },
                    {
                      label: t('item.financialOptions.totalCreditCost'),
                      value: `${numberSeparator(loan?.totalCreditCost || 0)} ${t(
                        'currency.default'
                      )}`,
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
