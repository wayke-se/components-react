import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Branch, InsuranceOption } from '../../@types/codegen/types';
import PubSub from '../../utils/pubsub/pubsub';
import { ButtonInline } from '../Button';
import { VisualHeading } from '../Heading';
import OptionBox from '../OptionBox';
import { OptionBoxContent, OptionBoxHeading } from '../OptionBox/wrapper';
import { Repeat, RepeatTiny } from '../Repeat';
import InsuranceModal from './InsuranceModal';

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
