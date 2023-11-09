import React, { useState, useCallback } from 'react';
import { ButtonSecondary, ButtonContent } from '../Button';
import { RepeatTiny } from '../Repeat';
import { useTranslation } from 'react-i18next';

interface ToggleItemProps {
  title: string;
  value: string;
  type: 'tel' | 'mailto';
  onClickVisible?: () => void;
  onClickValue?: () => void;
}

const ToggleItem = ({ title, value, type, onClickVisible, onClickValue }: ToggleItemProps) => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  const _onClickValue = useCallback(() => {
    if (onClickValue) {
      onClickValue();
    }
  }, []);

  const onClick = useCallback(() => {
    if (!visible) {
      setVisible(true);
      if (onClickVisible) {
        onClickVisible();
      }
    }
  }, [visible]);

  const visibleTitle =
    type === 'tel'
      ? t('item.actions.callNumber')
      : type === 'mailto'
      ? t('item.actions.sendEmailTo')
      : '';

  return (
    <RepeatTiny>
      {visible ? (
        <ButtonSecondary
          onClick={_onClickValue}
          as="a"
          href={`${type}:${value}`}
          title={`${visibleTitle} ${value}`}
          fullWidth
        >
          <ButtonContent>{value}</ButtonContent>
        </ButtonSecondary>
      ) : (
        <ButtonSecondary onClick={onClick} title={title} fullWidth>
          <ButtonContent>{title}</ButtonContent>
        </ButtonSecondary>
      )}
    </RepeatTiny>
  );
};

export default ToggleItem;
