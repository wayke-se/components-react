import React from 'react';

import Container from '../../components/Container/index';
import { Page, PageSection } from '../../components/Page/index';
import Loader from '../../components/Loader';

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
