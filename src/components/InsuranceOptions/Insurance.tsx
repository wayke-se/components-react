import React, { useState, useCallback } from 'react';
import { Repeat, RepeatTiny } from '../Repeat/index';
import { VisualHeading } from '../Heading';
import OptionBox from '../OptionBox';
import { OptionBoxHeading, OptionBoxContent } from '../OptionBox/wrapper';
import { ButtonInline } from '../Button';
import { InsuranceOption, Branch } from '../../@types/codegen/types';
import InsuranceModal from './InsuranceModal';

interface InsuranceOptions {
  id: string;
  branch?: Branch | null;
  insuranceOptions: InsuranceOption[];
}

const Insurance = ({ id, branch, insuranceOptions }: InsuranceOptions) => {
  const [modal, setModal] = useState(false);
  const toggleModal = useCallback(() => setModal(!modal), [modal]);
  if (!insuranceOptions.length) {
    return null;
  }

  return (
    <>
      {modal && (
        <InsuranceModal
          id={id}
          branch={branch}
          onClose={toggleModal}
          insuranceOptions={insuranceOptions[0]}
        />
      )}
      <Repeat>
        <RepeatTiny>
          <VisualHeading>Välj till försäkring</VisualHeading>
        </RepeatTiny>
        <RepeatTiny>
          <>
            {insuranceOptions.map((insuranceOption, index) => (
              <OptionBox
                key={`${insuranceOption.url}-${index}`}
                logo={insuranceOption.logotype || undefined}
                logoAlt={insuranceOption.name || 'Logotyp'}
              >
                <OptionBoxHeading>Få prisförslag</OptionBoxHeading>
                <OptionBoxContent>
                  <p>
                    <ButtonInline onClick={toggleModal}>Mer information</ButtonInline>
                  </p>
                </OptionBoxContent>
              </OptionBox>
            ))}
          </>
        </RepeatTiny>
      </Repeat>
    </>
  );
};

export default Insurance;
