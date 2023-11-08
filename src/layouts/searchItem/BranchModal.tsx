import React, { useState, useCallback, useContext } from 'react';

import { Repeat, RepeatTiny } from '../../components/Repeat/index';
import InputSelect from '../../components/InputSelect/index';
import { ButtonPrimary, ButtonContent } from '../../components/Button/index';
import Modal from '../../components/Modal/index';
import Content from '../../components/Content/index';
import InputLabel from '../../components/InputLabel/index';
import { BranchConnection } from '../../@types/codegen/types';
import { CentralStorageContext } from '../../State/CentralStorage/CentralStorageContext';
import { useTranslation } from 'react-i18next';

interface BranchModalProps {
  loading: boolean;
  connections?: BranchConnection[];
  onClose: () => void;
}

const BranchModal = ({ loading, connections, onClose }: BranchModalProps) => {
  const { t } = useTranslation();
  const { centralStorageId, setCentralStorageId } = useContext(CentralStorageContext);
  const [localValue, setLocalValue] = useState(centralStorageId);

  const onConfirm = useCallback((id: string) => {
    if (id) {
      setCentralStorageId(id);
    }
  }, []);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => setLocalValue(e.currentTarget.value),
    []
  );

  if (!localValue) {
    return null;
  }

  return (
    <Modal title={t('item.switchBranch')} onClose={onClose}>
      <Repeat>
        <RepeatTiny>
          <Content>
            <p>{t('item.switchBranchDescription')}</p>
          </Content>
        </RepeatTiny>
        <RepeatTiny>
          <InputLabel>{t('item.chooseBranch')}</InputLabel>
          <InputSelect
            value={localValue}
            onChange={onChange}
            options={connections?.map((x) => ({
              value: x.id,
              displayName: x.name,
            }))}
            title={t('item.chooseBranch')}
          />
        </RepeatTiny>
      </Repeat>
      <Repeat>
        <ButtonPrimary
          disabled={loading}
          fullWidth
          onClick={() => onConfirm(localValue)}
          title={t('item.chooseSelectedBranch') || ''}
        >
          <ButtonContent>{t('common.choose')}</ButtonContent>
        </ButtonPrimary>
      </Repeat>
    </Modal>
  );
};

export default BranchModal;
