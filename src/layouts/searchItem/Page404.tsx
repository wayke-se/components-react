import React from 'react';

import Container from '../../components/Container';
import { Page, PageSection } from '../../components/Page';
import { H1 } from '../../components/Heading';
import { useTranslation } from 'react-i18next';

const Page404 = () => {
  const { t } = useTranslation();
  return (
    <Page>
      <PageSection large>
        <Container>
          <H1 noMargin>{t('other.error404')}</H1>
        </Container>
      </PageSection>
    </Page>
  );
};

export default Page404;
