import React from 'react';

import Modal from '../../components/Modal';
import Content from '../../components/Content';
import { useTranslation } from 'react-i18next';

interface DemoCarModalProps {
  onClose: () => void;
}

const DemoCarModal = ({ onClose }: DemoCarModalProps) => {
  const { t } = useTranslation();
  return (
    <Modal title={t('item.demoCar')} onClose={onClose}>
      <Content>
        <p>{t('item.demoCarDescription')}</p>
      </Content>
    </Modal>
  );
};

export default DemoCarModal;
