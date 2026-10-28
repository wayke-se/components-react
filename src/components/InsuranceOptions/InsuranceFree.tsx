import { marked } from 'marked';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { InsuranceProvider } from '../../Gql/ad/types';
import { adEvent } from '../../Gql/ad/view';
import useAdContext from '../../State/Ad/AdContext';
import PubSub from '../../utils/pubsub/pubsub';
import { ButtonInline } from '../Button';
import Content from '../Content';
import { VisualHeading } from '../Heading';
import OptionBox from '../OptionBox';
import { OptionBoxContent } from '../OptionBox/wrapper';
import { Repeat, RepeatTiny } from '../Repeat';
import InsuranceFreeModal from './InsuranceFreeModal';

interface InsuranceFreeProps {
  provider: InsuranceProvider;
}

const InsuranceFree = ({ provider }: InsuranceFreeProps) => {
  const { t } = useTranslation();
  const ad = useAdContext();
  const [modal, setModal] = useState(false);
  const toggleModal = useCallback(() => {
    setModal(!modal);
    PubSub.publish(modal ? 'InsuranceClose' : 'InsuranceOpen', adEvent(ad));
  }, [modal, ad]);

  return (
    <>
      {modal && <InsuranceFreeModal onClose={toggleModal} provider={provider} />}
      <Repeat>
        <RepeatTiny>
          <VisualHeading>{provider.insuranceHeader ?? t('item.insurance')}</VisualHeading>
        </RepeatTiny>
        <RepeatTiny>
          <OptionBox
            logo={provider.logo || undefined}
            logoAlt={provider.title || t('common.logotype')}
          >
            {provider.description && (
              <Content
                dangerouslySetInnerHTML={{
                  __html: marked(provider.description),
                }}
              />
            )}
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

export default InsuranceFree;
