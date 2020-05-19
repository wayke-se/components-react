import React, { useMemo } from 'react';

import Container from '../../components/Container';
import UspList from '../../components/UspList';
import Repeat from '../../components/Repeat';
import DataGrid from '../../components/DataGrid';
import { Page, PageColumns, PageAside, PageMain, PageSection } from '../../components/Page';
import { H1, H2 } from '../../components/Heading';
import { ButtonPrimary, ButtonClear, ButtonContent } from '../../components/Button';
import { UtilityTextRight } from '../../components/Utility';
import useSearchItem from '../../hooks/useSearchItem';
import { notEmpty } from '../../utils/formats';

interface DefaultSerchItemLayoutProps {
  id?: string;
}

const DefaultSerchItemLayout = ({ id }: DefaultSerchItemLayoutProps) => {
  const { loading, data } = useSearchItem(id);
  const options = useMemo(
    () => data?.vehicle?.options?.filter(notEmpty).map((opt) => ({ title: opt })),
    [data?.vehicle?.options]
  );

  if (loading) {
    return <p>loading...</p>;
  }

  if (!data?.vehicle) {
    return <p>404</p>;
  }

  const { fuelType, gearbox, manufactureYear, manufacturer } = data.vehicle;

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
                        title: manufactureYear,
                      },
                      {
                        title: '--- mil',
                      },
                      {
                        title: gearbox,
                      },
                      {
                        title: fuelType,
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
                        value: manufacturer,
                      },
                      {
                        label: 'Mätarställning',
                        value: '2150 mil',
                        onClick: () => {},
                      },
                      {
                        label: 'Tillverkningsår',
                        value: manufactureYear,
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
                        label: 'Varumärke1',
                        value: 'Mercedes-Benz',
                      },
                      {
                        label: 'Mätarställning1',
                        value: '2150 mil',
                        onClick: () => {},
                      },
                      {
                        label: 'Tillverkningsår1',
                        value: '2018',
                        onClick: () => {},
                      },
                      {
                        label: 'Version1',
                        value: 'C 200 Coupé',
                        onClick: () => {},
                      },
                      {
                        label: 'Modell1',
                        value: 'C-Klass',
                      },
                      {
                        label: 'Varumärke2',
                        value: 'Mercedes-Benz',
                      },
                      {
                        label: 'Mätarställning2',
                        value: '2150 mil',
                        onClick: () => {},
                      },
                      {
                        label: 'Tillverkningsår2',
                        value: '2018',
                        onClick: () => {},
                      },
                      {
                        label: 'Version2',
                        value: 'C 200 Coupé',
                        onClick: () => {},
                      },
                      {
                        label: 'Modell2',
                        value: 'C-Klass',
                      },
                      {
                        label: 'Varumärke3',
                        value: 'Mercedes-Benz',
                      },
                    ]}
                  />
                </Repeat>
                <Repeat>
                  <UtilityTextRight>
                    <ButtonClear>
                      <ButtonContent>Visa mer</ButtonContent>
                    </ButtonClear>
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
                  <UspList items={options} />
                </Repeat>
                <Repeat>
                  <UtilityTextRight>
                    <ButtonClear>
                      <ButtonContent>Visa mer</ButtonContent>
                    </ButtonClear>
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
                    <ButtonClear>
                      <ButtonContent>Visa mer</ButtonContent>
                    </ButtonClear>
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
