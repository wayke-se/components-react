import React, { useState, useCallback } from 'react';
import { Item, Action, Icon, Label } from './wrapper';

interface ToggleItemProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const ToggleItem = ({ title, value, icon }: ToggleItemProps) => {
  const [visible, setVisible] = useState(false);

  const onClick = useCallback(() => !visible && setVisible(true), [visible]);

  return (
    <Item>
      <Action onClick={onClick} title="">
        <Icon>{icon}</Icon>
        <Label>{visible ? value : title}</Label>
      </Action>
    </Item>
  );
};

export default ToggleItem;
