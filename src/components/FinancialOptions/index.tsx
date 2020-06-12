import React, { Fragment } from 'react';
import Repeat from '../Repeat';
import { VisualHeading } from '../Heading';
import { SearchItem_vehicle_financialOptions } from '../../@types/gql/SearchItem';
import Leasing from './leasing';
import Loan from './loan';

interface FinancialOptionsProps {
  id: string;
  financialOptions: SearchItem_vehicle_financialOptions[];
}

const FinancialOptions = ({ id, financialOptions }: FinancialOptionsProps) => (
  <>
    <Repeat tiny>
      <VisualHeading>Andra finansieringsalternativ</VisualHeading>
    </Repeat>

    <Repeat tiny>
      <>
        {financialOptions.map((financialOption, index) => (
          <Fragment key={index}>
            {financialOption.type === 'leasing' && <Leasing financialOption={financialOption} />}
            {financialOption.type === 'loan' && <Loan id={id} financialOption={financialOption} />}
          </Fragment>
        ))}
      </>
    </Repeat>
  </>
);

export default FinancialOptions;
