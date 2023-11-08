import React, { useState, useCallback } from 'react';
import { Repeat, RepeatTiny } from '../Repeat/index';
import { VisualHeading } from '../Heading/index';
import OptionBox from '../OptionBox/index';
import { OptionBoxContent } from '../OptionBox/wrapper';
import Content from '../Content/index';
import { marked } from 'marked';
import { ButtonInline } from '../Button/index';
import { InsuranceOption } from '../../@types/codegen/types';
import InsuranceFreeModal from './InsuranceFreeModal';
import { useTranslation } from 'react-i18next';

interface InsuranceOptions {
  insuranceOptions: InsuranceOption[];
}

const Insurance = ({ insuranceOptions }: InsuranceOptions) => {
  const { t } = useTranslation();
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
          <VisualHeading>
            {insuranceOptions[0]?.insuranceHeader ?? t('item.insurance')}
          </VisualHeading>
        </RepeatTiny>
        <RepeatTiny>
          <>
            {insuranceOptions.map((insuranceOption, index) => (
              <OptionBox
                key={`${insuranceOption.url}-${index}`}
                logo={insuranceOption.logotype || undefined}
                logoAlt={insuranceOption.name || t('common.logotype')}
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
                    <ButtonInline onClick={toggleModal}>{t('common.moreInformation')}</ButtonInline>
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
