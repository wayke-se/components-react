import React from 'react';

import { Wrapper, Select, Option, Icon } from './wrapper';
import { IconChevronDown } from '../Icon';

const SortSelect = () => (
  <Wrapper>
    <Select>
      <Option>Sort option 1</Option>
      <Option>Sort option 2</Option>
      <Option>Sort option 3</Option>
      <Option>Sort option 4</Option>
      <Option>Sort option 5</Option>
    </Select>
    <Icon>
      <IconChevronDown block />
    </Icon>
  </Wrapper>
);

export default SortSelect;
