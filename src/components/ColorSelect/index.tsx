import React from 'react';

import { List, Item, Action, Color, Label } from './wrapper';

export interface ItemProps {
  label: string;
  hex: string[];
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
  boxShadow?: boolean;
}

export interface Props {
  items?: ItemProps[];
}

const ColorSelectItem = ({ label, hex, onClick, active, disabled, boxShadow }: ItemProps) => {
  return (
    <Item>
      <Action onClick={onClick} disabled={disabled} title={label} aria-label={label}>
        <Color
          style={{
            backgroundColor: hex.length === 1 ? hex[0] : '',
            backgroundImage: hex.length > 1 ? `linear-gradient(${hex.toString()})` : '',
          }}
          active={active}
          boxShadow={boxShadow}
          className={active ? 'wayke__theme wayke__color--primary-text' : ''}
        />
        <Label
          className={active ? 'wayke__theme wayke__color--primary-text wayke__font--bold' : ''}
        >
          {label}
        </Label>
      </Action>
    </Item>
  );
};

const ColorSelect = ({ items }: Props) => {
  if (!items) {
    return null;
  }

  return (
    <List>
      {items.map((item) => (
        <ColorSelectItem
          key={item.label}
          label={item.label}
          hex={item.hex}
          onClick={item.onClick}
          active={item.active}
          disabled={item.disabled}
          boxShadow={item.boxShadow}
        />
      ))}
    </List>
  );
};

export default ColorSelect;
