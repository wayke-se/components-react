import React from 'react';

import {
  List,
  Item,
  Header,
  Label,
  Heading,
  Indicator,
  IndicatorValue,
  Icon,
  Body,
} from './wrapper';
import { IconChevronDown } from '../Icon';

export interface IAccordionItem {
  heading: string;
  activeCount?: number;
  children: JSX.Element | JSX.Element[];
  isActive?: boolean;
}

export interface IAccordion {
  children?: JSX.Element | JSX.Element[];
}

export const AccordionItem = ({ heading, children, activeCount, isActive }: IAccordionItem) => {
  const [extend, setExtend] = React.useState(isActive || false);
  const onToggleExtend = React.useCallback(() => setExtend(!extend), [extend]);

  return (
    <Item isOpen={extend}>
      <Header onClick={onToggleExtend} title="Visa mer">
        <Label>
          <Heading
            className={activeCount && activeCount > 0 ? 'wayke__theme wayke__font--bold' : ''}
          >
            {heading}
          </Heading>
          {activeCount && activeCount > 0 && (
            <Indicator>
              <IndicatorValue>{activeCount}</IndicatorValue>
            </Indicator>
          )}
        </Label>
        <Icon>
          <IconChevronDown block />
        </Icon>
      </Header>
      <Body>{children}</Body>
    </Item>
  );
};

const Accordion = ({ children }: IAccordion) => <List>{children}</List>;

export default Accordion;
