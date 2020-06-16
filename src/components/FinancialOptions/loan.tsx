import React, { useState, useCallback } from 'react';

import OptionBox from '../OptionBox';
import { OptionBoxHeading, OptionBoxContent } from '../OptionBox/wrapper';
import { UtilityTextPrimary } from '../Utility';
import { ButtonInline } from '../Button';
import { SearchItem_vehicle_financialOptions } from '../../@types/gql/SearchItem';
import { numberSeparator } from '../../utils/formats';
import useLoanCalculation from '../../hooks/useLoan';
import LoanModal from './LoanModal';

interface LoanProps {
  id: string;
  financialOption: SearchItem_vehicle_financialOptions;
}

const Loan = ({ id, financialOption }: LoanProps) => {
  const [modal, setModal] = useState(false);
  const toggleModal = useCallback(() => setModal(!modal), [modal]);

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
      <OptionBox logo={logo} logoAlt="Logotyp">
        <OptionBoxHeading>Laddar...</OptionBoxHeading>

        <OptionBoxContent>
          <p>Laddar...</p>
        </OptionBoxContent>
      </OptionBox>
    );
  }

  return (
    <>
      {modal && <LoanModal id={id} financialOption={financialOption} onClose={toggleModal} />}
      <OptionBox logo={logo} logoAlt="Logotyp">
        <>
          <OptionBoxHeading>{`${numberSeparator(monthlyCost)} kr/mån*`}</OptionBoxHeading>

          <OptionBoxContent>
            <p>
              Delbetala{' '}
              {financialOption.loanAmount && duration && (
                <>
                  <UtilityTextPrimary>
                    {numberSeparator(financialOption.loanAmount)} kr
                  </UtilityTextPrimary>{' '}
                  i <UtilityTextPrimary>{duration} mån</UtilityTextPrimary>.
                </>
              )}
            </p>

            <p>
              {`*Beräknat på ${(interest * 100).toFixed(2)}% ränta. `}
              <ButtonInline onClick={toggleModal}>Läs mer</ButtonInline>
            </p>
          </OptionBoxContent>
        </>
      </OptionBox>
    </>
  );
};

export default Loan;
