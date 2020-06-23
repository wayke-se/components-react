import React, { Fragment } from 'react';
import Repeat from '../Repeat/index';
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
    <Repeat tiny>
      <VisualHeading>Andra finansieringsalternativ</VisualHeading>
    </Repeat>

    <Repeat tiny>
      {financialOptions.map((financialOption, index) => (
        <Fragment key={index}>
          {financialOption.type === 'leasing' && <Leasing financialOption={financialOption} />}
          {financialOption.type === 'loan' && <Loan id={id} financialOption={financialOption} />}
        </Fragment>
      ))}
    </Repeat>
  </Repeat>
);

export default FinancialOptions;
