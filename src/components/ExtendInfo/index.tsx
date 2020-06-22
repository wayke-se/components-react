import React from 'react';

import { Wrapper, Header, Title, Info, InfoBtn, Extend } from './wrapper';
import { IconInfo } from '../Icon';

interface Props {
  title: string;
  children: JSX.Element | JSX.Element[] | string;
}

const ExtendInfo = ({ title, children }: Props) => {
  const [extend, setExtend] = React.useState(false);
  const onToggleExtend = React.useCallback(() => setExtend(!extend), [extend]);

  return (
    <Wrapper>
      <Header>
        <Title>{title}</Title>
        <Info>
          <InfoBtn onClick={onToggleExtend} title="Mer information">
            <IconInfo block />
          </InfoBtn>
        </Info>
      </Header>
      {extend && <Extend>{children}</Extend>}
    </Wrapper>
  );
};

export default ExtendInfo;
