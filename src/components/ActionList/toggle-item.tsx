import React, { useState, useCallback } from 'react';
import { ButtonSecondary, ButtonContent } from '../Button/index';
import Repeat from '../Repeat/index';

interface ToggleItemProps {
  title: string;
  value: string;
  type: 'tel' | 'mailto';
  onClickVisible?: () => void;
  onClickValue?: () => void;
}

const initialValue: { [key: string]: boolean | undefined } = {};

const getInitialValue = (title: string) => title && !!initialValue[title];

const ToggleItem = ({ title, value, type, onClickVisible, onClickValue }: ToggleItemProps) => {
  const [visible, setVisible] = useState(() => getInitialValue(type));

  const _onClickValue = useCallback(() => {
    if (onClickValue) {
      onClickValue();
    }
  }, []);

  const onClick = useCallback(() => {
    if (!visible) {
      initialValue[type] = true;
      setVisible(true);
      if (onClickVisible) {
        onClickVisible();
      }
    }
  }, [visible]);

  const visibleTitle = type === 'tel' ? 'Ring' : type === 'mailto' ? 'Skicka ett mail till' : '';

  return (
    <Repeat tiny>
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
    </Repeat>
  );
};

export default ToggleItem;
