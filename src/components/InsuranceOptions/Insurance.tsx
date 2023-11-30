import React, { useState, useCallback } from 'react';
import { Repeat, RepeatTiny } from '../Repeat';
import { VisualHeading } from '../Heading';
import OptionBox from '../OptionBox';
import { OptionBoxHeading, OptionBoxContent } from '../OptionBox/wrapper';
import { ButtonInline } from '../Button';
import { InsuranceOption, Branch } from '../../@types/codegen/types';
import InsuranceModal from './InsuranceModal';
import { useTranslation } from 'react-i18next';
import PubSub from '../../utils/pubsub/pubsub';

interface InsuranceOptions {
  id: string;
  branch?: Branch | null;
  insuranceOptions: InsuranceOption[];
}

const Insurance = ({ id, branch, insuranceOptions }: InsuranceOptions) => {
  const { t } = useTranslation();
  const [modal, setModal] = useState(false);
  const toggleModal = useCallback(() => {
    setModal(!modal);
    PubSub.publish(modal ? 'InsuranceClose' : 'InsuranceOpen', {
      id,
      branchId: branch?.id,
      branchName: branch?.name,
    });
  }, [modal, branch]);

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
          <VisualHeading>{t('item.addInsurance')}</VisualHeading>
        </RepeatTiny>
        <RepeatTiny>
          <>
            {insuranceOptions.map((insuranceOption, index) => (
              <OptionBox
                key={`${insuranceOption.url}-${index}`}
                logo={insuranceOption.logotype || undefined}
                logoAlt={insuranceOption.name || t('common.logotype')}
              >
                <OptionBoxHeading>{t('item.getInsuranceQuote')}</OptionBoxHeading>
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
