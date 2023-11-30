import React, { useState, useCallback } from 'react';
import { Repeat, RepeatTiny } from '../Repeat';
import { VisualHeading } from '../Heading';
import OptionBox from '../OptionBox';
import { OptionBoxContent } from '../OptionBox/wrapper';
import Content from '../Content';
import { marked } from 'marked';
import { ButtonInline } from '../Button';
import { Branch, InsuranceOption, Maybe } from '../../@types/codegen/types';
import InsuranceFreeModal from './InsuranceFreeModal';
import { useTranslation } from 'react-i18next';
import PubSub from '../../utils/pubsub/pubsub';

interface InsuranceOptions {
  id: string;
  branch?: Maybe<Branch>;
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
