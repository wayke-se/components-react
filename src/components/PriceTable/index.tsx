import React from 'react';

import { List, Item, Value, Label } from './wrapper';
import { VisualHeading } from '../Heading';
import { Price, OldPrice } from '../Price';
import { numberSeparator } from '../../utils/formats';
import { useTranslation } from 'react-i18next';

interface PriceTableProps {
  price: number;
  discount?: number;
}

const PriceTable = ({ price, discount }: PriceTableProps) => {
  const { t } = useTranslation();
  return (
    <List>
      <Item>
        <Label>
          <VisualHeading>{t('other.price')}</VisualHeading>
        </Label>
        <Value>
          <Price>
            {numberSeparator(price)} {t('currency.default')}
          </Price>
        </Value>
      </Item>
      {discount !== undefined && (
        <Item>
          <Label />
          <Value>
            <OldPrice>
              {numberSeparator(price + discount)} {t('currency.default')}
            </OldPrice>
          </Value>
        </Item>
      )}
    </List>
  );
};

export default PriceTable;
