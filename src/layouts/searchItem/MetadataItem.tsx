import React, { useState, useCallback } from 'react';
import { Property } from '../../@types/vehicle-properties';

import {
  TableListItem,
  TableListKey,
  TableListValue,
  TableListBooleanPos,
  TableListBooleanNeg,
} from '../../components/TableList';
import { IconCheck, IconCancel } from '../../components/Icon';
import { SrOnly } from '../../components/SrOnly';
import { ButtonInline } from '../../components/Button';
import Modal from '../../components/Modal';
import Content from '../../components/Content';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';

const formatValue = (
  t: TFunction<'translation', undefined>,
  value: Property['value'],
  unit: Property['unit']
) => {
  if (typeof value === 'boolean') {
    return value ? (
      <TableListBooleanPos title={t('common.yes') || ''}>
        <SrOnly>{t('common.yes')}</SrOnly>
        <IconCheck block />
      </TableListBooleanPos>
    ) : (
      <TableListBooleanNeg title={t('common.no') || ''}>
        <SrOnly>{t('common.no')}</SrOnly>
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

  const presentedValue = formatValue(t, value, unit);

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
