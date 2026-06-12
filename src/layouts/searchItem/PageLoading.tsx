import React from 'react';

import Container from '../../components/Container';
import Loader from '../../components/Loader';
import { Page, PageSection } from '../../components/Page';

const PageLoading = () => (
  <Page>
    <PageSection large>
      <Container>
        <Loader />
      </Container>
    </PageSection>
  </Page>
);

export default PageLoading;
