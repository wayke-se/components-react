import React, { useState, useCallback } from 'react';
import Repeat from '../Repeat';
import { VisualHeading } from '../Heading';
import OptionBox from '../OptionBox';
import { OptionBoxHeading, OptionBoxContent } from '../OptionBox/wrapper';
import { ButtonInline } from '../Button';
import { SearchItem_vehicle_insuranceOptions } from '../../@types/gql/SearchItem';
import InsuranceOptionModal from './InsuranceOptionModal';

interface InsuranceOptions {
  id: string;
  insuranceOptions: SearchItem_vehicle_insuranceOptions[];
}

const InsuranceOptions = ({ id, insuranceOptions }: InsuranceOptions) => {
  const [modal, setModal] = useState(false);
  const toggleModal = useCallback(() => setModal(!modal), [modal]);
  if (!insuranceOptions.length) {
    return null;
  }
  return (
    <>
      {modal && <InsuranceOptionModal id={id} onClose={toggleModal} />}
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
                  {insuranceOption.name}.<ButtonInline onClick={toggleModal}>Läs mer</ButtonInline>
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
