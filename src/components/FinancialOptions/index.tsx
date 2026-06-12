import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Branch, FinancialOption, Maybe } from '../../@types/codegen/types';
import { MarketCode } from '../../@types/market';
import { CreditorDisclaimer } from '../CreditorDisclaimer';
import { VisualHeading } from '../Heading';
import { Repeat, RepeatTiny } from '../Repeat';
import Leasing from './leasing';
import Loan from './loan';

interface FinancialOptionsProps {
  id: string;
  branch?: Maybe<Branch>;
  financialOptions: FinancialOption[];
  marketCode?: MarketCode;
}

const FinancialOptions = ({ id, branch, financialOptions, marketCode }: FinancialOptionsProps) => {
  const { t } = useTranslation();

  const hasLoanOption = financialOptions.some((option) => option.type === 'loan');
  const showCreditorDisclaimer = marketCode === 'SE' && hasLoanOption;

  return (
    <Repeat>
      <RepeatTiny>
        <VisualHeading>{t('item.financialOptions.otherFinancialOptions')}</VisualHeading>
      </RepeatTiny>
      <RepeatTiny>
        {financialOptions.map((financialOption, index) => (
          <Fragment key={index}>
            {(financialOption.type === 'leasing' ||
              financialOption.type === 'business-leasing') && (
              <Leasing financialOption={financialOption} />
            )}
            {financialOption.type === 'loan' && (
              <Loan
                id={id}
                branch={branch}
                financialOption={financialOption}
                marketCode={marketCode}
              />
            )}
          </Fragment>
        ))}
      </RepeatTiny>
      {showCreditorDisclaimer && (
        <RepeatTiny>
          <CreditorDisclaimer />
        </RepeatTiny>
      )}
    </Repeat>
  );
};

export default FinancialOptions;
