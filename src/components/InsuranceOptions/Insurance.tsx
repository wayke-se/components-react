import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { InsuranceProvider } from '../../Gql/ad/types';
import { adEvent } from '../../Gql/ad/view';
import useAdContext from '../../State/Ad/AdContext';
import PubSub from '../../utils/pubsub/pubsub';
import { ButtonInline } from '../Button';
import { VisualHeading } from '../Heading';
import OptionBox from '../OptionBox';
import { OptionBoxContent, OptionBoxHeading } from '../OptionBox/wrapper';
import { Repeat, RepeatTiny } from '../Repeat';
import InsuranceModal from './InsuranceModal';

interface InsuranceProps {
  provider: InsuranceProvider;
}

const Insurance = ({ provider }: InsuranceProps) => {
  const { t } = useTranslation();
  const ad = useAdContext();
  const [modal, setModal] = useState(false);
  const toggleModal = useCallback(() => {
    setModal(!modal);
    PubSub.publish(modal ? 'InsuranceClose' : 'InsuranceOpen', adEvent(ad));
  }, [modal, ad]);

  return (
    <>
      {modal && <InsuranceModal onClose={toggleModal} provider={provider} />}
      <Repeat>
        <RepeatTiny>
          <VisualHeading>{t('item.addInsurance')}</VisualHeading>
        </RepeatTiny>
        <RepeatTiny>
          <OptionBox
            logo={provider.logo || undefined}
            logoAlt={provider.title || t('common.logotype')}
          >
            <OptionBoxHeading>{t('item.getInsuranceQuote')}</OptionBoxHeading>
            <OptionBoxContent>
              <p>
                <ButtonInline onClick={toggleModal}>{t('common.moreInformation')}</ButtonInline>
              </p>
            </OptionBoxContent>
          </OptionBox>
        </RepeatTiny>
      </Repeat>
    </>
  );
};

export default Insurance;
