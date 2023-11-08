import React, { useState, useCallback } from 'react';
import { Property } from '../../@types/vehicle-properties';

import {
  TableListItem,
  TableListKey,
  TableListValue,
  TableListBooleanPos,
  TableListBooleanNeg,
} from '../../components/TableList/index';
import { IconCheck, IconCancel } from '../../components/Icon/index';
import { SrOnly } from '../../components/SrOnly/index';
import { ButtonInline } from '../../components/Button/index';
import Modal from '../../components/Modal/index';
import Content from '../../components/Content/index';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

const formatValue = (value: Property['value'], unit: Property['unit']) => {
  if (typeof value === 'boolean') {
    return value ? (
      <TableListBooleanPos title={i18next.t('common.yes') || ''}>
        <SrOnly>{i18next.t('common.yes')}</SrOnly>
        <IconCheck block />
      </TableListBooleanPos>
    ) : (
      <TableListBooleanNeg title={i18next.t('common.no') || ''}>
        <SrOnly>{i18next.t('common.no')}</SrOnly>
        <IconCancel block />
      </TableListBooleanNeg>
    );
  }
  if (Array.isArray(value)) {
    return value.join(', ');
  }
  if (!!value && !!unit) {
    return `${value} ${unit}`;
  }
  return value;
};

interface MetadataItemProps {
  name: string;
  hint?: string | null | undefined;
  value: Property['value'];
  unit: Property['unit'];
}

const MetadataItem = ({ name, hint, value, unit }: MetadataItemProps) => {
  const { t } = useTranslation();
  const [foldout, setFoldout] = useState(false);
  const onToggleFoldout = useCallback(() => setFoldout(!foldout), [foldout]);

  const presentedValue = formatValue(value, unit);

  return (
    <TableListItem>
      <TableListKey>
        {hint ? (
          <ButtonInline
            onClick={onToggleFoldout}
            title={t('item.moreInfoAboutSubject', { subject: name }) || ''}
          >
            {name}
          </ButtonInline>
        ) : (
          name
        )}
      </TableListKey>
      <TableListValue>
        {value !== undefined ? presentedValue : t('item.dataNotAvailable')}
      </TableListValue>
      {hint && foldout && (
        <Modal title={name} onClose={onToggleFoldout}>
          <Content dangerouslySetInnerHTML={{ __html: hint }} />
        </Modal>
      )}
    </TableListItem>
  );
};

export default MetadataItem;
