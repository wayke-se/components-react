import React from 'react';
import { useTranslation } from 'react-i18next';
import { PaymentResponse } from '../../Gql/ad/types';
import { LeasingOffer } from '../../Gql/ad/view';
import useSettings from '../../State/Settings/useSettings';
import { CreditorDisclaimer } from '../CreditorDisclaimer';
import { VisualHeading } from '../Heading';
import { Repeat, RepeatTiny } from '../Repeat';
import Leasing from './leasing';
import Loan from './loan';

interface FinancialOptionsProps {
  loans: PaymentResponse[];
  leasing: LeasingOffer[];
}

const FinancialOptions = ({ loans, leasing }: FinancialOptionsProps) => {
  const { t } = useTranslation();
  const { marketCode } = useSettings();

  return (
    <Repeat>
      <RepeatTiny>
        <VisualHeading>{t('item.financialOptions.otherFinancialOptions')}</VisualHeading>
      </RepeatTiny>
      <RepeatTiny>
        {leasing.map((offer) => (
          <Leasing key={offer.business ? 'business' : 'private'} offer={offer} />
        ))}
        {loans.map((loan) => (
          <Loan key={loan.financialOptionId} loan={loan} />
        ))}
      </RepeatTiny>
      {marketCode === 'SE' && loans.length > 0 && (
        <RepeatTiny>
          <CreditorDisclaimer />
        </RepeatTiny>
      )}
    </Repeat>
  );
};

export default FinancialOptions;
