import React from 'react';

import Modal from '../Modal';
import Content from '../Content';
import { Repeat } from '../Repeat';
import { ButtonInline } from '../Button';
import LogoBox from '../LogoBox';
import { InsuranceOption } from '../../@types/codegen/types';
import { marked } from 'marked';
import { useTranslation } from 'react-i18next';

interface InsuranceFreeModal {
  onClose: () => void;
  insuranceOptions: InsuranceOption;
}

const InsuranceFreeModal = ({ onClose, insuranceOptions }: InsuranceFreeModal) => {
  const { t } = useTranslation();
  return (
    <Modal title={insuranceOptions?.insuranceHeader ?? t('item.insurance')} onClose={onClose}>
      {insuranceOptions?.longDescription && (
        <Repeat>
          <Content
            dangerouslySetInnerHTML={{
              __html: marked(insuranceOptions.longDescription),
            }}
          ></Content>
        </Repeat>
      )}
      {insuranceOptions?.url && (
        <Repeat>
          <ButtonInline
            as="a"
            href={insuranceOptions.url}
            title={t('item.readMoreAboutInsuranceInNewTab') || ''}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('item.readMoreAboutInsuranceInNewTab')}
          </ButtonInline>
        </Repeat>
      )}
      {insuranceOptions?.logotype && (
        <Repeat>
          <LogoBox
            logo={insuranceOptions.logotype}
            alt={insuranceOptions.name || t('common.logotype')}
            wide
          />
        </Repeat>
      )}
    </Modal>
  );
};

export default InsuranceFreeModal;
