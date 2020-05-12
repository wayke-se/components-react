import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import VEHICLE_QUERY from '../../queries/VEHICLE_QUERY';
import { VehicleQuery } from '../../@types/gql/VehicleQuery';

import Container from '../../components/Container';
import UspList from '../../components/UspList';
import Repeat from '../../components/Repeat';
import DataGrid from '../../components/DataGrid';
import { Page, PageColumns, PageAside, PageMain, PageSection } from '../../components/Page';
import { H1, H2 } from '../../components/Heading';
import { ButtonPrimary, ButtonClear, ButtonContent } from '../../components/Button';
import { UtilityTextRight } from '../../components/Utility';

const DefaultSerchItemLayout = () => {
  const { loading } = useQuery<VehicleQuery>(VEHICLE_QUERY, { variables: { id: 'test' } });

  return (
    <Page>
      <PageSection>
        <Container>
          <PageColumns>
            <PageAside>
              <Repeat>
                <Repeat small>
                  <H1 noMargin>Mercedes-Benz C 200 Coupé</H1>
                </Repeat>
                <Repeat small>
                  <div>Mercedes 7G-Tronic Plus AMG Sport Euro 6 184hk</div>
                </Repeat>
                <Repeat small>
                  <UspList
                    small
                    items={[
                      {
                        title: '2018',
                      },
                      {
                        title: '2150 mil',
                      },
                      {
                        title: 'Automat',
                      },
                      {
                        title: 'Bensin',
                      },
                    ]}
                  />
                </Repeat>
              </Repeat>
              <Repeat>
                <div>Pris</div>
              </Repeat>
              <Repeat>
                <ButtonPrimary fullWidth>
                  <ButtonContent>Köp bilen online</ButtonContent>
                </ButtonPrimary>
              </Repeat>
            </PageAside>
            <PageMain>
              {loading && <PageSection>Loading...</PageSection>}
              <PageSection>
                <H2 noMargin>Galleri</H2>
              </PageSection>
              <PageSection>
                <Repeat>
                  <H2 noMargin>Biluppgifter</H2>
                </Repeat>
                <Repeat>
                  <DataGrid
                    items={[
                      {
                        label: 'Varumärke',
                        value: 'Mercedes-Benz',
                      },
                      {
                        label: 'Mätarställning',
                        value: '2150 mil',
                        onClick: () => {},
                      },
                      {
                        label: 'Tillverkningsår',
                        value: '2018',
                        onClick: () => {},
                      },
                      {
                        label: 'Version',
                        value: 'C 200 Coupé',
                        onClick: () => {},
                      },
                      {
                        label: 'Modell',
                        value: 'C-Klass',
                      },
                      {
                        label: 'Varumärke',
                        value: 'Mercedes-Benz',
                      },
                      {
                        label: 'Mätarställning',
                        value: '2150 mil',
                        onClick: () => {},
                      },
                      {
                        label: 'Tillverkningsår',
                        value: '2018',
                        onClick: () => {},
                      },
                      {
                        label: 'Version',
                        value: 'C 200 Coupé',
                        onClick: () => {},
                      },
                      {
                        label: 'Modell',
                        value: 'C-Klass',
                      },
                      {
                        label: 'Varumärke',
                        value: 'Mercedes-Benz',
                      },
                      {
                        label: 'Mätarställning',
                        value: '2150 mil',
                        onClick: () => {},
                      },
                      {
                        label: 'Tillverkningsår',
                        value: '2018',
                        onClick: () => {},
                      },
                      {
                        label: 'Version',
                        value: 'C 200 Coupé',
                        onClick: () => {},
                      },
                      {
                        label: 'Modell',
                        value: 'C-Klass',
                      },
                      {
                        label: 'Varumärke',
                        value: 'Mercedes-Benz',
                      },
                    ]}
                  />
                </Repeat>
                <Repeat>
                  <UtilityTextRight>
                    <ButtonClear>Visa mer</ButtonClear>
                  </UtilityTextRight>
                </Repeat>
              </PageSection>
              <PageSection>
                <H2 noMargin>Testimonial</H2>
              </PageSection>
              <PageSection>
                <Repeat>
                  <H2 noMargin>Utrustning</H2>
                </Repeat>
                <Repeat>
                  <UspList
                    items={[
                      {
                        title: 'Lorem ipsum dolor sit amet',
                      },
                      {
                        title: 'Consectetur adipiscing elit',
                        onClick: () => {},
                      },
                      {
                        title: 'Sed do eiusmod',
                      },
                      {
                        title: 'Tempor incididunt ut',
                      },
                      {
                        title: 'Labore et dolore',
                      },
                      {
                        title: 'Magna aliqua',
                      },
                      {
                        title: 'Ut enim ad minim veniam',
                      },
                      {
                        title: 'Quis',
                      },
                      {
                        title: 'Nostrud exercitation',
                        onClick: () => {},
                      },
                      {
                        title: 'Ullamco laboris nisi ut aliquip',
                      },
                      {
                        title: 'Ex ea',
                      },
                      {
                        title: 'Commodo consequat',
                      },
                    ]}
                  />
                </Repeat>
                <Repeat>
                  <UtilityTextRight>
                    <ButtonClear>Visa mer</ButtonClear>
                  </UtilityTextRight>
                </Repeat>
              </PageSection>
              <PageSection>
                <H2 noMargin>Den här bilen finns på vår anläggning i Göteborg</H2>
              </PageSection>
              <PageSection>
                <Repeat>
                  <H2 noMargin>Begagnatgaranti</H2>
                </Repeat>
                <Repeat>
                  <div>Begagnatgaranti info</div>
                </Repeat>
                <Repeat>
                  <UtilityTextRight>
                    <ButtonClear>Visa mer</ButtonClear>
                  </UtilityTextRight>
                </Repeat>
              </PageSection>
              <PageSection>
                <H2 noMargin>Historik</H2>
              </PageSection>
            </PageMain>
          </PageColumns>
        </Container>
      </PageSection>
      <PageSection accent>
        <Container>
          <H2 noMargin>Senast inkomna</H2>
          <div>Product Grid</div>
        </Container>
      </PageSection>
    </Page>
  );
};

export default DefaultSerchItemLayout;
