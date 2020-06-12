import React from 'react';
import Repeat from '../Repeat';
import { VisualHeading } from '../Heading';
import OptionBox from '../OptionBox';
import { OptionBoxHeading, OptionBoxContent } from '../OptionBox/wrapper';
import { ButtonInline } from '../Button';
import { SearchItem_vehicle_insuranceOptions } from '../../@types/gql/SearchItem';

interface InsuranceOptions {
  insuranceOptions: SearchItem_vehicle_insuranceOptions[];
}

const InsuranceOptions = ({ insuranceOptions }: InsuranceOptions) => {
  if (!insuranceOptions.length) {
    return null;
  }
  return (
    <>
      <Repeat tiny>
        <VisualHeading>Välj till försäkring</VisualHeading>
      </Repeat>
      <Repeat tiny>
        <>
          {insuranceOptions.map((insuranceOption, index) => (
            <OptionBox
              key={`${insuranceOption.url}-${index}`}
              logo={insuranceOption.logotype || 'https://placehold.it/24x24'}
              logoAlt="Logotyp"
            >
              <OptionBoxHeading>??? kr/mån</OptionBoxHeading>
              <OptionBoxContent>
                <p>
                  {insuranceOption.name}.<ButtonInline>Läs mer</ButtonInline>
                </p>
              </OptionBoxContent>
            </OptionBox>
          ))}
        </>
      </Repeat>
    </>
  );
};

export default InsuranceOptions;
