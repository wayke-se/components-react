import React from 'react';

import OptionBox from '../OptionBox';
import { OptionBoxHeading, OptionBoxContent } from '../OptionBox/wrapper';
import { UtilityTextPrimary } from '../Utility';
import { ButtonInline } from '../Button';
import { SearchItem_vehicle_financialOptions } from '../../@types/gql/SearchItem';
import { numberSeparator } from '../../utils/formats';
import useLoanCalculation from '../../hooks/useLoan';

interface LoanProps {
  id: string;
  financialOption: SearchItem_vehicle_financialOptions;
}

const Loan = ({ id, financialOption }: LoanProps) => {
  const { data } = useLoanCalculation(
    id,
    financialOption.duration?.current,
    financialOption.downPayment?.current,
    financialOption.residual?.current
  );
  const interest = data?.loanCalculation?.interest;
  const duration = data?.loanCalculation?.duration?.current;
  const monthlyCost = data?.loanCalculation?.monthlyCost;

  const logo = financialOption?.logotype || 'https://placehold.it/67x10';

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
      <OptionBox logo={logo} logoAlt="Logotyp">
        <OptionBoxHeading>Laddar...</OptionBoxHeading>

        <OptionBoxContent>
          <p>Laddar...</p>
        </OptionBoxContent>
      </OptionBox>
    );
  }

  return (
    <OptionBox logo={logo} logoAlt="Logotyp">
      <>
        <OptionBoxHeading>{`${numberSeparator(monthlyCost)} kr/mån*`}</OptionBoxHeading>

        <OptionBoxContent>
          <p>
            Delbetala{' '}
            <UtilityTextPrimary>
              {numberSeparator(financialOption.loanAmount)} kr
            </UtilityTextPrimary>{' '}
            i <UtilityTextPrimary>{duration} mån</UtilityTextPrimary>.
          </p>

          <p>
            {`*Beräknat på ${(interest * 100).toFixed(2)}% ränta. `}
            <ButtonInline>Läs mer</ButtonInline>
          </p>
        </OptionBoxContent>
      </>
    </OptionBox>
  );
};

export default Loan;
