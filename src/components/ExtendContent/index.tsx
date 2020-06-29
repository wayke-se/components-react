import React, { useState, useCallback } from 'react';

import { Wrapper, Extend, Action } from './wrapper';
import { ButtonClear, ButtonContent } from '../Button/index';

interface Props {
  children: React.ReactNode;
  actionTitle: string;
  onClick?: () => void;
}

const ExtendContent = ({ children, actionTitle, onClick }: Props) => {
  const [extend, setExtend] = useState(false);
  const onExtend = useCallback(() => {
    setExtend(true);
    if (onClick) {
      onClick();
    }
  }, []);

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
