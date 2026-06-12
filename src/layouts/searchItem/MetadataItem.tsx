import { TFunction } from 'i18next';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Property } from '../../@types/vehicle-properties';
import { ButtonInline } from '../../components/Button';
import Content from '../../components/Content';
import { IconCancel, IconCheck } from '../../components/Icon';
import Modal from '../../components/Modal';
import { SrOnly } from '../../components/SrOnly';
import {
  TableListBooleanNeg,
  TableListBooleanPos,
  TableListItem,
  TableListKey,
  TableListValue,
} from '../../components/TableList';

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
