import React from 'react';
import { useTranslation } from 'react-i18next';
import { InsuranceProvider } from '../../Gql/ad/types';
import { ButtonInline } from '../Button';
import Content from '../Content';
import LogoBox from '../LogoBox';
import Modal from '../Modal';
import { Repeat } from '../Repeat';

interface InsuranceFreeModalProps {
  onClose: () => void;
  provider: InsuranceProvider;
}

const InsuranceFreeModal = ({ onClose, provider }: InsuranceFreeModalProps) => {
  const { t } = useTranslation();
  return (
    <Modal title={provider.insuranceHeader ?? t('item.insurance')} onClose={onClose}>
      {provider.longDescription && (
        <Repeat>
          <Content markdown={provider.longDescription} />
        </Repeat>
      )}
      {provider.url && (
        <Repeat>
          <ButtonInline
            as="a"
            href={provider.url}
            title={t('item.readMoreAboutInsuranceInNewTab') || ''}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('item.readMoreAboutInsuranceInNewTab')}
          </ButtonInline>
        </Repeat>
      )}
      {provider.logo && (
        <Repeat>
          <LogoBox logo={provider.logo} alt={provider.title || t('common.logotype')} wide />
        </Repeat>
      )}
    </Modal>
  );
};

export default InsuranceFreeModal;
