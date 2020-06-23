import React, { useState, useCallback } from 'react';
import { Item, Action, Icon, Label } from './wrapper';

interface ToggleItemProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  type: 'tel' | 'mailto';
}

const ToggleItem = ({ title, value, icon, type }: ToggleItemProps) => {
  const [visible, setVisible] = useState(false);

  const onClick = useCallback(() => !visible && setVisible(true), [visible]);

  const visibleTitle = type === 'tel' ? 'Ring' : type === 'mailto' ? 'Skicka ett mail till' : '';

  return (
    <Item>
      {visible ? (
        <Action as="a" href={`${type}:${value}`} title={`${visibleTitle} ${value}`}>
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
