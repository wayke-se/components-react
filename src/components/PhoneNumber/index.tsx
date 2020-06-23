import React, { useState, useCallback } from 'react';

import { TableColumnRow, TableColumnCell } from '../TableColumn';
import { ButtonContent, ButtonInlineBold } from '../Button';

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
        {visible ? (
          <ButtonInlineBold as="a" href={`tel:${phoneNumber}`} title={`Ring ${phoneNumber}`}>
            <ButtonContent>{phoneNumber}</ButtonContent>
          </ButtonInlineBold>
        ) : (
          <ButtonInlineBold onClick={onClick} title="Visa telefonnummer">
            <ButtonContent>Visa telefonnummer</ButtonContent>
          </ButtonInlineBold>
        )}
      </TableColumnCell>
    </TableColumnRow>
  );
};

export default PhoneNumber;
