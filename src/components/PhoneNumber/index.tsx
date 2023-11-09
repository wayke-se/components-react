import React, { useState, useCallback } from 'react';

import { TableColumnRow, TableColumnCell } from '../TableColumn';
import { ButtonContent, ButtonInlineBold } from '../Button';
import { useTranslation } from 'react-i18next';

interface PhoneNumberProps {
  phoneNumber: string;
}

const PhoneNumber = ({ phoneNumber }: PhoneNumberProps) => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  const onClick = useCallback(() => !visible && setVisible(true), [visible]);

  return (
    <TableColumnRow>
      <TableColumnCell>{t('other.phoneNumber')}</TableColumnCell>
      <TableColumnCell>
        {visible ? (
          <ButtonInlineBold
            as="a"
            href={`tel:${phoneNumber}`}
            title={t('other.callPhoneNumber', { phoneNumber }) || ''}
          >
            <ButtonContent>{phoneNumber}</ButtonContent>
          </ButtonInlineBold>
        ) : (
          <ButtonInlineBold onClick={onClick} title={t('other.showPhoneNumber') || ''}>
            <ButtonContent>{t('other.showPhoneNumber')}</ButtonContent>
          </ButtonInlineBold>
        )}
      </TableColumnCell>
    </TableColumnRow>
  );
};

export default PhoneNumber;
