import React from 'react';

import OptionBox from '../OptionBox';
import { OptionBoxHeading, OptionBoxContent } from '../OptionBox/wrapper';
import { UtilityTextPrimary } from '../Utility';
import { ButtonInline } from '../Button';
import { SearchItem_vehicle_financialOptions } from '../../@types/gql/SearchItem';
import { numberSeparator } from '../../utils/formats';

interface LeasingProps {
  financialOption: SearchItem_vehicle_financialOptions;
}

const Leasing = ({ financialOption }: LeasingProps) => (
  <OptionBox>
    <>
      {financialOption.monthlyCost !== null && (
        <OptionBoxHeading>{`ca ${numberSeparator(
          financialOption.monthlyCost
        )} kr/mån`}</OptionBoxHeading>
      )}
    </>
    <OptionBoxContent>
      <p>
        Privatleasing <UtilityTextPrimary>??? mil/år</UtilityTextPrimary> i{' '}
        <UtilityTextPrimary>??? mån</UtilityTextPrimary>. <ButtonInline>Läs mer</ButtonInline>
      </p>
    </OptionBoxContent>
  </OptionBox>
);

export default Leasing;
