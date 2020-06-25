import React from 'react';

import Container from '../../components/Container/index';
import { Page, PageSection } from '../../components/Page/index';
import { H1 } from '../../components/Heading/index';

const Page404 = () => (
  <Page>
    <PageSection large>
      <Container>
        <H1 noMargin>404</H1>
      </Container>
    </PageSection>
  </Page>
);

export default Page404;
