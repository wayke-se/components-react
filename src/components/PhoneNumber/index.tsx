import React, { useState, useCallback } from 'react';

import { TableColumnRow, TableColumnCell } from '../TableColumn/index';
import { ButtonContent, ButtonInlineBold } from '../Button/index';

interface PhoneNumberProps {
  phoneNumber: string;
}

const PhoneNumber = ({ phoneNumber }: PhoneNumberProps) => {
  const [visible, setVisible] = useState(false);

  const onClick = useCallback(() => !visible && setVisible(true), [visible]);

  return (
    <TableColumnRow>
      <TableColumnCell>Telefonnummer</TableColumnCell>
      <TableColumnCell>
        <ButtonInlineBold onClick={onClick}>
          <ButtonContent>{visible ? phoneNumber : 'Visa telefonnummer'}</ButtonContent>
        </ButtonInlineBold>
      </TableColumnCell>
    </TableColumnRow>
  );
};

export default PhoneNumber;
