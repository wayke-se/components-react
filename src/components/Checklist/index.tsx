import React from 'react';
import { IconCheck, IconRadio } from '../Icon';
import { Action, ActionIcon, ActionLabel, Item, List } from './wrapper';

export interface IChecklistItem {
  label: string;
  onClick: () => void;
  active?: boolean;
  radio?: boolean;
}

export interface IChecklist {
  items: IChecklistItem[];
  radio?: boolean;
}

const ChecklistItem = ({ label, onClick, active, radio }: IChecklistItem) => (
  <Item>
    <Action onClick={onClick}>
      {active && <ActionIcon>{radio ? <IconRadio block /> : <IconCheck block />}</ActionIcon>}
      <ActionLabel
        className={active ? 'wayke__theme wayke__font--bold wayke__color--primary-text' : ''}
      >
        {label}
      </ActionLabel>
    </Action>
  </Item>
);

const Checklist = ({ items, radio }: IChecklist) => {
  if (!items?.length) {
    return null;
  }

  return (
    <List>
      {items.map((item) => (
        <ChecklistItem
          key={item.label}
          label={item.label}
          onClick={item.onClick}
          active={item.active}
          radio={radio}
        />
      ))}
    </List>
  );
};

export default Checklist;
