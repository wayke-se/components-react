import React from 'react';

import { Wrapper, Main, Heading, Description, Footer, Foldout } from './wrapper';
import { ButtonClear, ButtonContent } from '../Button/index';
import { useTranslation } from 'react-i18next';

interface Props {
  heading: string;
  description?: string;
  children: React.ReactNode;
}

const DetailBox = ({ heading, description, children }: Props) => {
  const { t } = useTranslation();
  const [extend, setExtend] = React.useState(false);
  const onToggleExtend = React.useCallback(() => setExtend(!extend), [extend]);

  const extendBtnText = extend ? t('common.lessInformation') : t('common.moreInformation');

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
