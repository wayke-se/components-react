import React, { useState, useCallback } from 'react';
import Repeat from '../Repeat';
import { VisualHeading } from '../Heading';
import OptionBox from '../OptionBox';
import { OptionBoxHeading, OptionBoxContent } from '../OptionBox/wrapper';
import { ButtonInline } from '../Button';
import InsuranceOptionModal from './InsuranceOptionModal';
import { InsuranceOption } from '../../@types/codegen/types';

interface InsuranceOptions {
  id: string;
  insuranceOptions: InsuranceOption[];
}

const InsuranceOptions = ({ id, insuranceOptions }: InsuranceOptions) => {
  const [modal, setModal] = useState(false);
  const toggleModal = useCallback(() => setModal(!modal), [modal]);
  if (!insuranceOptions.length) {
    return null;
  }

  return (
    <>
      {modal && (
        <InsuranceOptionModal
          id={id}
          onClose={toggleModal}
          insuranceOptions={insuranceOptions[0]}
        />
      )}
      <Repeat>
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
                    {insuranceOption.name}.{' '}
                    <ButtonInline onClick={toggleModal}>Läs mer</ButtonInline>
                  </p>
                </OptionBoxContent>
              </OptionBox>
            ))}
          </>
        </Repeat>
      </Repeat>
    </>
  );
};

export default InsuranceOptions;
