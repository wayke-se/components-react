import * as React from 'react';

import { Action, Item, List, Wrapper } from './wrapper';

export interface TabItem {
  name: string;
  displayName: string;
}

export interface Props {
  tabs: TabItem[];
  active: string;
}

const Tabs = ({ tabs, active }: Props) => (
  <Wrapper>
    <List>
      {tabs.map((tab) => (
        <Item key={tab.name}>
          <Action title={tab.displayName} active={tab.name === active ? 'true' : undefined}>
            {tab.displayName}
          </Action>
        </Item>
      ))}
    </List>
  </Wrapper>
);

export default Tabs;
