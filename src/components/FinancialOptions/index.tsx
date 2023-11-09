import React, { Fragment } from 'react';
import { Repeat, RepeatTiny } from '../Repeat';
import { VisualHeading } from '../Heading';
import Leasing from './leasing';
import Loan from './loan';
import { FinancialOption } from '../../@types/codegen/types';
import { useTranslation } from 'react-i18next';

interface FinancialOptionsProps {
  id: string;
  financialOptions: FinancialOption[];
}

const FinancialOptions = ({ id, financialOptions }: FinancialOptionsProps) => {
  const { t } = useTranslation();
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
            {financialOption.type === 'loan' && <Loan id={id} financialOption={financialOption} />}
          </Fragment>
        ))}
      </RepeatTiny>
    </Repeat>
  );
};

export default FinancialOptions;
