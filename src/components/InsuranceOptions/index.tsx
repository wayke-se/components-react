import React, { useState, useCallback } from 'react';
import Repeat from '../Repeat/index';
import { VisualHeading } from '../Heading/index';
import OptionBox from '../OptionBox/index';
import { OptionBoxHeading, OptionBoxContent } from '../OptionBox/wrapper';
import { ButtonInline } from '../Button/index';
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
                logo={insuranceOption.logotype || undefined}
                logoAlt={insuranceOption.name || 'Logotyp'}
              >
                <OptionBoxHeading>{insuranceOption.name}</OptionBoxHeading>
                <OptionBoxContent>
                  <p>
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
