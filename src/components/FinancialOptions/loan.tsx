import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Branch, FinancialOption, Maybe } from '../../@types/codegen/types';
import { MarketCode } from '../../@types/market';
import useLoanCalculation from '../../hooks/useLoan';
import { numberSeparator } from '../../utils/formats';
import PubSub from '../../utils/pubsub/pubsub';
import { ButtonInline } from '../Button';
import OptionBox from '../OptionBox';
import { OptionBoxContent, OptionBoxHeading } from '../OptionBox/wrapper';
import LoanModal from './LoanModal';

interface LoanProps {
  id: string;
  branch?: Maybe<Branch>;
  financialOption: FinancialOption;
  marketCode?: MarketCode;
}

const Loan = ({ id, branch, financialOption, marketCode }: LoanProps) => {
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
          marketCode={marketCode}
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
