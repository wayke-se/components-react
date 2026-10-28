import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PaymentResponse } from '../../Gql/ad/types';
import useLoanCalculation from '../../Gql/ad/useLoanCalculation';
import { adEvent, num } from '../../Gql/ad/view';
import useAdContext from '../../State/Ad/AdContext';
import useSettings from '../../State/Settings/useSettings';
import { numberSeparator } from '../../utils/formats';
import PubSub from '../../utils/pubsub/pubsub';
import { ButtonInline } from '../Button';
import OptionBox from '../OptionBox';
import { OptionBoxContent, OptionBoxHeading } from '../OptionBox/wrapper';
import LoanModal from './LoanModal';

interface LoanProps {
  loan: PaymentResponse;
}

const Loan = ({ loan }: LoanProps) => {
  const { t } = useTranslation();
  const ad = useAdContext();
  const { publicApi } = useSettings();
  const [modal, setModal] = useState(false);
  const toggleModal = useCallback(() => {
    setModal(!modal);
    PubSub.publish(modal ? 'FinanceClose' : 'FinanceOpen', adEvent(ad));
  }, [modal, ad]);

  // The list gives the defaults; the calculation gives the monthly cost for them.
  const { payment } = useLoanCalculation(publicApi, ad.id, {
    financialOptionId: loan.financialOptionId,
    duration: num(loan.duration?.current),
    downPayment: num(loan.downPayment?.current),
    residual: num(loan.residual?.current),
  });

  const interest = num(payment?.interest);
  const duration = num(payment?.duration?.current);
  const monthlyCost = num(payment?.monthlyCost);
  const loanAmount = num(loan.loanAmount);
  const logo = loan.imageUrl || undefined;

  if (interest === undefined || duration === undefined || monthlyCost === undefined) {
    return (
      <OptionBox logo={logo} logoAlt={t('common.logotype')}>
        <OptionBoxHeading>{t('other.loading')}</OptionBoxHeading>
        <OptionBoxContent>
          <p>{t('other.loading')}</p>
        </OptionBoxContent>
      </OptionBox>
    );
  }

  return (
    <>
      {modal && <LoanModal loan={loan} onClose={toggleModal} />}
      <OptionBox logo={logo} logoAlt={t('common.logotype')}>
        <>
          <OptionBoxHeading>{`${numberSeparator(monthlyCost)} ${t(
            'currency.monthly'
          )}*`}</OptionBoxHeading>

          <OptionBoxContent>
            <p>
              {loanAmount && duration
                ? t('item.financialOptions.payInInstallmentsDetailed', {
                    amount: `${numberSeparator(loanAmount)} kr`,
                    duration,
                  })
                : t('item.financialOptions.payInInstallments')}
            </p>

            <p>
              *
              {t('item.financialOptions.disclaimer', {
                interest: `${(interest * 100).toFixed(2)}%`,
              })}{' '}
              <ButtonInline onClick={toggleModal}>{t('common.readMore')}</ButtonInline>
            </p>
          </OptionBoxContent>
        </>
      </OptionBox>
    </>
  );
};

export default Loan;
