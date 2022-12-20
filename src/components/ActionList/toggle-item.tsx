import React, { useState, useCallback } from 'react';
import { ButtonSecondary, ButtonContent } from '../Button/index';
import { RepeatTiny } from '../Repeat/index';

interface ToggleItemProps {
  title: string;
  value: string;
  type: 'tel' | 'mailto';
  onClickVisible?: () => void;
  onClickValue?: () => void;
}

const ToggleItem = ({ title, value, type, onClickVisible, onClickValue }: ToggleItemProps) => {
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

  const visibleTitle = type === 'tel' ? 'Ring' : type === 'mailto' ? 'Skicka ett mail till' : '';

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
