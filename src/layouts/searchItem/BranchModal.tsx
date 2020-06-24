import React, { useState, useCallback } from 'react';

import Repeat from '../../components/Repeat/index';
import InputSelect from '../../components/InputSelect/index';
import { ButtonPrimary, ButtonContent } from '../../components/Button/index';
import Modal from '../../components/Modal/index';
import Content from '../../components/Content/index';
import InputLabel from '../../components/InputLabel/index';
import { BranchConnection } from '../../@types/codegen/types';

interface BranchModalProps {
  value: string;
  loading: boolean;
  connections?: BranchConnection[];
  onConfirm: (value: string) => void;
  onClose: () => void;
}

const BranchModal = ({ value, loading, connections, onConfirm, onClose }: BranchModalProps) => {
  const [localValue, setLocalValue] = useState(value);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => setLocalValue(e.currentTarget.value),
    []
  );

  return (
    <Modal title="Centrallager" onClose={onClose}>
      <Repeat>
        <Content>
          <p>Välj den anläggning du vill visa kontaktuppgifter för.</p>
        </Content>
      </Repeat>
      <Repeat tiny>
        <InputLabel>Välj anläggning</InputLabel>
        <InputSelect
          value={localValue}
          onChange={onChange}
          options={connections?.map((x) => ({
            value: x.id,
            displayName: x.name,
          }))}
        />
      </Repeat>
      <Repeat>
        <ButtonPrimary disabled={loading} fullWidth onClick={() => onConfirm(localValue)}>
          <ButtonContent>Välj</ButtonContent>
        </ButtonPrimary>
      </Repeat>
    </Modal>
  );
};

export default BranchModal;
