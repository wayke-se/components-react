import React from 'react';

import { Wrapper, Extend, Action } from './wrapper';
import { ButtonClear, ButtonContent } from '../Button';

interface Props {
  children: JSX.Element | JSX.Element[];
  actionTitle: string;
}

const ExtendContent = ({ children, actionTitle }: Props) => {
  const [extend, setExtend] = React.useState(false);
  const onExtend = React.useCallback(() => setExtend(true), [extend]);

  return (
    <Wrapper>
      <Extend extended={extend}>{children}</Extend>
      {!extend && (
        <Action>
          <ButtonClear onClick={onExtend} title={actionTitle}>
            <ButtonContent>{actionTitle}</ButtonContent>
          </ButtonClear>
        </Action>
      )}
    </Wrapper>
  );
};

export default ExtendContent;
