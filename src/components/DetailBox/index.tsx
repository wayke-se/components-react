import React from 'react';

import { Wrapper, Main, Heading, Description, Footer, Foldout } from './wrapper';
import { ButtonClear, ButtonContent } from '../Button';

interface Props {
  heading: string;
  description?: string;
  children: JSX.Element | JSX.Element[];
}

const DetailBox = ({ heading, description, children }: Props) => {
  const [extend, setExtend] = React.useState(false);
  const onToggleExtend = React.useCallback(() => setExtend(!extend), [extend]);

  const extendBtnText = extend ? 'Mindre information' : 'Mer information';

  return (
    <Wrapper>
      <Main>
        <Heading>{heading}</Heading>
        {description && <Description>{description}</Description>}
        <Footer>
          <ButtonClear onClick={onToggleExtend}>
            <ButtonContent>{extendBtnText}</ButtonContent>
          </ButtonClear>
        </Footer>
      </Main>
      {extend && <Foldout>{children}</Foldout>}
    </Wrapper>
  );
};

export default DetailBox;
