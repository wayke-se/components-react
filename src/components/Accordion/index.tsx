import React, { useState, useCallback } from 'react';

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
import { useTranslation } from 'react-i18next';

export interface IAccordionItem {
  heading: string;
  activeCount?: number;
  children: React.ReactNode;
  isActive?: boolean;
}

export interface IAccordion {
  children?: React.ReactNode;
}

export const AccordionItem = ({ heading, children, activeCount, isActive }: IAccordionItem) => {
  const { t } = useTranslation();
  const [extend, setExtend] = useState(isActive || false);
  const onToggleExtend = useCallback(() => setExtend(!extend), [extend]);

  return (
    <Item isOpen={extend}>
      <Header onClick={onToggleExtend} title={t('common.showMore') || ''}>
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
