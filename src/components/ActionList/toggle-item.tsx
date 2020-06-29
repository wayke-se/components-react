import React, { useState, useCallback } from 'react';
import { Item, Action, Icon, Label } from './wrapper';

interface ToggleItemProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  type: 'tel' | 'mailto';
  onClickVisible?: () => void;
  onClickValue?: () => void;
}

const initialValue: { [key: string]: boolean | undefined } = {};

const getInitialValue = (title: string) => title && !!initialValue[title];

const ToggleItem = ({
  title,
  value,
  icon,
  type,
  onClickVisible,
  onClickValue,
}: ToggleItemProps) => {
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
    <Item>
      {visible ? (
        <Action
          onClick={_onClickValue}
          as="a"
          href={`${type}:${value}`}
          title={`${visibleTitle} ${value}`}
        >
          <Icon>{icon}</Icon>
          <Label>{value}</Label>
        </Action>
      ) : (
        <Action onClick={onClick} title={title}>
          <Icon>{icon}</Icon>
          <Label>{title}</Label>
        </Action>
      )}
    </Item>
  );
};

export default ToggleItem;
