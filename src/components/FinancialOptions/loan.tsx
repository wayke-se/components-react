import React, { useState, useCallback } from 'react';

import OptionBox from '../OptionBox';
import { OptionBoxHeading, OptionBoxContent } from '../OptionBox/wrapper';
import { ButtonInline } from '../Button';
import { numberSeparator } from '../../utils/formats';
import useLoanCalculation from '../../hooks/useLoan';
import { Branch, FinancialOption, Maybe } from '../../@types/codegen/types';
import LoanModal from './LoanModal';
import { useTranslation } from 'react-i18next';
import PubSub from '../../utils/pubsub/pubsub';

interface LoanProps {
  id: string;
  branch?: Maybe<Branch>;
  financialOption: FinancialOption;
}

const Loan = ({ id, branch, financialOption }: LoanProps) => {
  const { t } = useTranslation();
  const [modal, setModal] = useState(false);
  const toggleModal = useCallback(() => {
    setModal(!modal);
    PubSub.publish(modal ? 'FinanceClose' : 'FinanceOpen', {
      id,
      branchId: branch?.id,
      branchName: branch?.name,
    });
  }, [modal, branch]);

  const { data } = useLoanCalculation(
    id,
    financialOption.duration?.current,
    financialOption.downPayment?.current,
    financialOption.residual?.current
  );

  const interest = data?.loan?.interest;
  const duration = data?.loan?.duration?.current;
  const monthlyCost = data?.loan?.monthlyCost;

  const logo = financialOption?.logotype || 'https://placehold.it/67x10';

  // Skeleton?
  if (
    financialOption.loanAmount === undefined ||
    financialOption.loanAmount === null ||
    interest === undefined ||
    duration === undefined ||
    monthlyCost === undefined ||
    interest === null ||
    duration === null ||
    monthlyCost === null
  ) {
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
      {modal && (
        <LoanModal
          id={id}
          branch={branch}
          financialOption={financialOption}
          onClose={toggleModal}
        />
      )}
      <OptionBox logo={logo} logoAlt={t('common.logotype')}>
        <>
          <OptionBoxHeading>{`${numberSeparator(monthlyCost)} ${t(
            'currency.monthly'
          )}*`}</OptionBoxHeading>

          <OptionBoxContent>
            <p>
              {financialOption.loanAmount && duration
                ? t('item.financialOptions.payInInstallmentsDetailed', {
                    amount: `${numberSeparator(financialOption.loanAmount)} kr`,
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
