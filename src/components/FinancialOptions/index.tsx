import React, { Fragment } from 'react';
import { Repeat, RepeatTiny } from '../Repeat/index';
import { VisualHeading } from '../Heading/index';
import Leasing from './leasing';
import Loan from './loan';
import { FinancialOption } from '../../@types/codegen/types';

interface FinancialOptionsProps {
  id: string;
  financialOptions: FinancialOption[];
}

const FinancialOptions = ({ id, financialOptions }: FinancialOptionsProps) => (
  <Repeat>
    <RepeatTiny>
      <VisualHeading>Andra finansieringsalternativ</VisualHeading>
    </RepeatTiny>
    <RepeatTiny>
      {financialOptions.map((financialOption, index) => (
        <Fragment key={index}>
          {(financialOption.type === 'leasing' || financialOption.type === 'business-leasing') && (
            <Leasing financialOption={financialOption} />
          )}
          {financialOption.type === 'loan' && <Loan id={id} financialOption={financialOption} />}
        </Fragment>
      ))}
    </RepeatTiny>
  </Repeat>
);

export default FinancialOptions;
