import React, { useState, useCallback } from 'react';
import { Repeat, RepeatTiny } from '../Repeat';
import { VisualHeading } from '../Heading';
import OptionBox from '../OptionBox';
import { OptionBoxContent } from '../OptionBox/wrapper';
import Content from '../Content';
import { marked } from 'marked';
import { ButtonInline } from '../Button';
import { InsuranceOption } from '../../@types/codegen/types';
import InsuranceFreeModal from './InsuranceFreeModal';

interface InsuranceOptions {
  insuranceOptions: InsuranceOption[];
}

const Insurance = ({ insuranceOptions }: InsuranceOptions) => {
  const [modal, setModal] = useState(false);
  const toggleModal = useCallback(() => setModal(!modal), [modal]);
  if (!insuranceOptions.length) {
    return null;
  }

  return (
    <>
      {modal && <InsuranceFreeModal onClose={toggleModal} insuranceOptions={insuranceOptions[0]} />}
      <Repeat>
        <RepeatTiny>
          <VisualHeading>{insuranceOptions[0]?.insuranceHeader ?? 'Försäkring'}</VisualHeading>
        </RepeatTiny>
        <RepeatTiny>
          <>
            {insuranceOptions.map((insuranceOption, index) => (
              <OptionBox
                key={`${insuranceOption.url}-${index}`}
                logo={insuranceOption.logotype || undefined}
                logoAlt={insuranceOption.name || 'Logotyp'}
              >
                {insuranceOption.description && (
                  <Content
                    dangerouslySetInnerHTML={{
                      __html: marked(insuranceOption.description),
                    }}
                  />
                )}
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
