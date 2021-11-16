import * as React from 'react';

import { Action, Item, List, Wrapper } from './wrapper';

export interface ITabItem {
  name: string;
  displayName: string;
}

export interface ITabInterface<T> {
  tabs: ITabItem[];
  active: string;
  onClick?: (name: T) => void;
}

const Tabs = <T extends {}>({ tabs, active, onClick }: ITabInterface<T>) => (
  <Wrapper>
    <List>
      {tabs.map((tab) => (
        <Item key={tab.name}>
          <Action
            title={tab.displayName}
            onClick={onClick ? () => onClick(tab.name as unknown as T) : undefined}
            active={tab.name === active ? 'true' : undefined}
          >
            {tab.displayName}
          </Action>
        </Item>
      ))}
    </List>
  </Wrapper>
);

export default Tabs;
