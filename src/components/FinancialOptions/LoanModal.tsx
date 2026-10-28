import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PaymentResponse } from '../../Gql/ad/types';
import useLoanCalculation from '../../Gql/ad/useLoanCalculation';
import { adEvent, num, range } from '../../Gql/ad/view';
import useAdContext from '../../State/Ad/AdContext';
import useSettings from '../../State/Settings/useSettings';
import { numberSeparator } from '../../utils/formats';
import PubSub from '../../utils/pubsub/pubsub';
import { ButtonClear, ButtonContent } from '../Button';
import Content from '../Content';
import { ContentLogo, ContentLogoMedia, ContentLogoText } from '../ContentLogo';
import { CreditorDisclaimer } from '../CreditorDisclaimer';
import DataList from '../DataList';
import LogoBox from '../LogoBox';
import Modal from '../Modal';
import { ModalFoldout, ModalFoldoutBody } from '../Modal/wrapper';
import SliderWithLabel from '../RangeSlider/SliderWithLabel';
import { Repeat, RepeatSmall, RepeatTiny } from '../Repeat';

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
  loan: PaymentResponse;
  onClose: () => void;
}

const LoanModal = ({ loan: option, onClose }: LoanModalProps) => {
  const { t } = useTranslation();
  const ad = useAdContext();
  const { publicApi, marketCode } = useSettings();
  const [extend, setExtend] = React.useState(false);

  const trackPayload = useMemo(() => adEvent(ad), [ad]);

  const onToggleExtend = React.useCallback(() => {
    if (!extend) {
      PubSub.publish('FinanceInterest', trackPayload);
    }
    setExtend(!extend);
  }, [extend]);

  const [variables, setVariables] = useState({
    duration: num(option.duration?.current),
    downPayment: num(option.downPayment?.current),
    residual: num(option.residual?.current),
  });

  const { loading, payment } = useLoanCalculation(publicApi, ad.id, {
    financialOptionId: option.financialOptionId,
    ...variables,
  });

  // The API snaps the values to its steps; the sliders follow what it settled on.
  useEffect(() => {
    if (payment) {
      setVariables({
        duration: num(payment.duration?.current) || 0,
        downPayment: num(payment.downPayment?.current) || 0,
        residual: num(payment.residual?.current) || 0,
      });
    }
  }, [payment]);

  const { residual } = variables;
  const downPayment = range(payment?.downPayment);
  const downPaymentCurrent = downPayment?.current || 0;
  const downPaymentMin = downPayment?.min || 0;
  const downPaymentMax = downPayment?.max || 0;
  const downPaymentSteps = stepGenerator(downPayment?.step || 0, downPaymentMax);
  const onDownPaymentChange = useCallback(
    (values: readonly number[]) => {
      PubSub.publish('FinanceInterest', trackPayload);
      setVariables({ ...variables, downPayment: values[0] });
    },
    [variables, trackPayload]
  );

  const duration = range(payment?.duration);
  const durationCurrent = duration?.current || 0;
  const durationMin = duration?.min || 0;
  const durationMax = duration?.max || 0;
  const durationSteps = stepGenerator(duration?.step || 0, durationMax);
  const onDurationChange = useCallback(
    (values: readonly number[]) => {
      PubSub.publish('FinanceInterest', trackPayload);
      setVariables({ ...variables, duration: values[0] });
    },
    [variables, trackPayload]
  );

  const residualRange = range(payment?.residual);
  const residualCurrent = (residualRange?.current || 0) * 100;
  const residualMin = (residualRange?.min || 0) * 100;
  const residualMax = (residualRange?.max || 0) * 100;
  const residualSteps = stepGenerator((residualRange?.step || 0) * 100, residualMax);
  const onResidualChange = useCallback(
    (values: readonly number[]) => {
      PubSub.publish('FinanceInterest', trackPayload);
      setVariables({ ...variables, residual: values[0] / 100 });
    },
    [variables, trackPayload]
  );

  const interestText = ((num(payment?.interest) || 0) * 100).toFixed(2);
  const effectiveInterestText = ((num(payment?.effectiveInterest) || 0) * 100).toFixed(2);
  const monthlyCost = num(payment?.monthlyCost);
  const image = option.imageUrl || undefined;
  const name = option.name || option.financialInstitution;

  return (
    <Modal title={t('item.financialOptions.loanOptions')} onClose={onClose}>
      {option.description ? (
        <Repeat>
          <ContentLogo>
            <ContentLogoText>
              <Content>
                <p>{option.description}</p>
              </Content>
            </ContentLogoText>
            {image && (
              <ContentLogoMedia>
                <LogoBox logo={image} alt={name || t('common.logotype')} wide />
              </ContentLogoMedia>
            )}
          </ContentLogo>
        </Repeat>
      ) : (
        <>
          {image && (
            <Repeat>
              <LogoBox logo={image} alt={name || t('common.logotype')} wide />
            </Repeat>
          )}
        </>
      )}
      <Repeat>
        <RepeatSmall>
          <SliderWithLabel
            label={t('item.financialOptions.downPayment')}
            values={[downPaymentCurrent]}
            domain={[downPaymentMin, downPaymentMax]}
            steps={downPaymentSteps}
            unit={t('currency.default')}
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
                {t('item.financialOptions.loanOptionsDisclaimer', {
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
                      value: `${numberSeparator(num(option.setupFee) || 0)} ${t(
                        'currency.default'
                      )}`,
                    },
                    {
                      label: t('item.financialOptions.administrationFee'),
                      value: `${numberSeparator(num(option.administrationFee) || 0)} ${t(
                        'currency.monthly'
                      )}`,
                    },
                    {
                      label: t('item.financialOptions.totalCreditCost'),
                      value: `${numberSeparator(num(payment?.totalCreditCost) || 0)} ${t(
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
      {marketCode === 'SE' && (
        <Repeat>
          <CreditorDisclaimer />
        </Repeat>
      )}
    </Modal>
  );
};

export default LoanModal;
