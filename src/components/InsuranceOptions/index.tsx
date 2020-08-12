import React, { useState, useCallback, Suspense, lazy } from 'react';
import Repeat from '../Repeat/index';
import { VisualHeading } from '../Heading/index';
import OptionBox from '../OptionBox/index';
import { OptionBoxHeading, OptionBoxContent } from '../OptionBox/wrapper';
import { ButtonInline } from '../Button/index';
import { InsuranceOption } from '../../@types/codegen/types';

const InsuranceOptionModal = lazy(() => import('./InsuranceOptionModal'));

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
      <Suspense fallback={null}>
        {modal && (
          <InsuranceOptionModal
            id={id}
            onClose={toggleModal}
            insuranceOptions={insuranceOptions[0]}
          />
        )}
      </Suspense>
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
                <OptionBoxHeading>Få prisförslag</OptionBoxHeading>
                <OptionBoxContent>
                  <p>
                    <ButtonInline onClick={toggleModal}>Mer information</ButtonInline>
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
