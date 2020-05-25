import React, { useMemo } from 'react';

import Container from '../../components/Container';
import UspList from '../../components/UspList';
import Repeat from '../../components/Repeat';
import DataGrid from '../../components/DataGrid';
import PriceTable from '../../components/PriceTable';
import OptionBox from '../../components/OptionBox';
import LogoBox from '../../components/LogoBox';
import ActionList from '../../components/ActionList';
import Content from '../../components/Content';
import InputText from '../../components/InputText';
import Badge from '../../components/Badge';
import { OptionBoxHeading, OptionBoxContent } from '../../components/OptionBox/wrapper';
import { InputAction, InputActionInput, InputActionBtn } from '../../components/InputAction';
import { Page, PageSection } from '../../components/Page';
import {
  ProductPage,
  ProductPageMainSection,
  ProductPageAside,
  ProductPageMain,
  ProductPageAsideSection,
  ProductPageContentLimit,
} from '../../components/ProductPage';
import { H1, H2, VisualHeading } from '../../components/Heading';
import {
  ButtonPrimary,
  ButtonClear,
  ButtonContent,
  ButtonInline,
  ButtonInlineBold,
} from '../../components/Button';
import {
  UtilityTextRight,
  UtilityTextPrimary,
  UtilityTextPrimaryBold,
  UtilityTextBold,
} from '../../components/Utility';
import { TableColumn, TableColumnRow, TableColumnCell } from '../../components/TableColumn';
import CheckMarkList, { CheckMarkListItem } from '../../components/CheckMarkList';
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
          <ProductPage>
            <ProductPageAside>
              <ProductPageAsideSection mobileOrder={1}>
                <Repeat>
                  <LogoBox logo="https://placehold.it/24x24" alt="Logotyp" />
                </Repeat>
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
              </ProductPageAsideSection>

              <ProductPageAsideSection mobileOrder={2}>
                <PriceTable />
              </ProductPageAsideSection>

              <ProductPageAsideSection mobileOrder={4}>
                <Repeat small>
                  <Repeat tiny>
                    <VisualHeading>Andra finansieringsalternativ</VisualHeading>
                  </Repeat>
                  <Repeat tiny>
                    <OptionBox>
                      <OptionBoxHeading>ca 5 800 kr/mån</OptionBoxHeading>
                      <OptionBoxContent>
                        <p>
                          Privatleasing <UtilityTextPrimary>1 500 mil/år</UtilityTextPrimary> i{' '}
                          <UtilityTextPrimary>36 mån</UtilityTextPrimary>.{' '}
                          <ButtonInline>Läs mer</ButtonInline>
                        </p>
                      </OptionBoxContent>
                    </OptionBox>
                    <OptionBox logo="https://placehold.it/67x10" logoAlt="Logotyp">
                      <OptionBoxHeading>5 879 kr/mån*</OptionBoxHeading>
                      <OptionBoxContent>
                        <p>
                          Delbetala <UtilityTextPrimary>311 920 kr</UtilityTextPrimary> i{' '}
                          <UtilityTextPrimary>60 mån</UtilityTextPrimary>.
                        </p>
                        <p>
                          *Beräknat på 4,9% ränta. <ButtonInline>Läs mer</ButtonInline>
                        </p>
                      </OptionBoxContent>
                    </OptionBox>
                  </Repeat>
                </Repeat>
                <Repeat small>
                  <Repeat tiny>
                    <VisualHeading>Välj till försäkring</VisualHeading>
                  </Repeat>
                  <Repeat tiny>
                    <OptionBox logo="https://placehold.it/24x24" logoAlt="Logotyp">
                      <OptionBoxHeading>496 kr/mån</OptionBoxHeading>
                      <OptionBoxContent>
                        <p>
                          Halvförsäkring med If Rulla-vidare. <ButtonInline>Läs mer</ButtonInline>
                        </p>
                      </OptionBoxContent>
                    </OptionBox>
                  </Repeat>
                </Repeat>
              </ProductPageAsideSection>

              <ProductPageAsideSection mobileOrder={5}>
                <Repeat>
                  <CheckMarkList>
                    <CheckMarkListItem>
                      <>
                        Inkl. <ButtonInline>Das WeltAuto</ButtonInline> begagnatgaranti
                      </>
                    </CheckMarkListItem>
                    <CheckMarkListItem>
                      <>
                        Inkl. <ButtonInline>Bilia Total</ButtonInline>
                      </>
                    </CheckMarkListItem>
                    <CheckMarkListItem>
                      <>
                        Inkl. <ButtonInline>Bilia MaxiTrygg</ButtonInline>-garanti
                      </>
                    </CheckMarkListItem>
                    <CheckMarkListItem>Gratis hemleverans</CheckMarkListItem>
                    <CheckMarkListItem>Vinterhjul inkluderade</CheckMarkListItem>
                  </CheckMarkList>
                </Repeat>
                <Repeat>
                  <ButtonPrimary fullWidth>
                    <ButtonContent>Köp bilen online</ButtonContent>
                  </ButtonPrimary>
                </Repeat>
                <Repeat>
                  <ActionList />
                </Repeat>
              </ProductPageAsideSection>
            </ProductPageAside>
            <ProductPageMain>
              <ProductPageAsideSection mobileOrder={3}>
                <div style={{ height: '0', paddingBottom: '56.25%', backgroundColor: '#f0f0f0' }} />
              </ProductPageAsideSection>

              <ProductPageMainSection>
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
              </ProductPageMainSection>

              <ProductPageMainSection>
                <Repeat>
                  <H2 noMargin>Testimonial</H2>
                </Repeat>
                <Repeat>Testimonial...</Repeat>
              </ProductPageMainSection>

              <ProductPageMainSection>
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
              </ProductPageMainSection>

              <ProductPageMainSection>
                <Repeat>
                  <H2 noMargin>Den här bilen finns på vår anläggning i Göteborg</H2>
                </Repeat>
                <Repeat>
                  <div
                    style={{
                      height: '200px',
                      backgroundColor: '#f0f0f0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#717171',
                    }}
                  >
                    <div>Karta</div>
                  </div>
                </Repeat>
                <Repeat>
                  <ProductPageContentLimit>
                    <Repeat>
                      <TableColumn>
                        <TableColumnRow>
                          <TableColumnCell>Adress</TableColumnCell>
                          <TableColumnCell>
                            <ButtonInlineBold>
                              <ButtonContent>Gatunamn 123, Göteborg</ButtonContent>
                            </ButtonInlineBold>
                          </TableColumnCell>
                        </TableColumnRow>
                        <TableColumnRow>
                          <TableColumnCell>Telefonnummer</TableColumnCell>
                          <TableColumnCell>
                            <ButtonInlineBold>
                              <ButtonContent>Visa telefonnummer</ButtonContent>
                            </ButtonInlineBold>
                          </TableColumnCell>
                        </TableColumnRow>
                      </TableColumn>
                    </Repeat>
                    <Repeat>
                      <Repeat small>
                        <Badge label="Öppet" severity="positive" />
                      </Repeat>
                      <Repeat small>
                        <TableColumn>
                          <TableColumnRow>
                            <TableColumnCell>
                              <UtilityTextBold>Öppet idag</UtilityTextBold>
                            </TableColumnCell>
                            <TableColumnCell>
                              <UtilityTextBold>9:00-19:00</UtilityTextBold>
                            </TableColumnCell>
                          </TableColumnRow>
                          <TableColumnRow>
                            <TableColumnCell>Mån-fre</TableColumnCell>
                            <TableColumnCell>9:00-19:00</TableColumnCell>
                          </TableColumnRow>
                          <TableColumnRow>
                            <TableColumnCell>Lör-sön</TableColumnCell>
                            <TableColumnCell>10:00-16:00</TableColumnCell>
                          </TableColumnRow>
                        </TableColumn>
                      </Repeat>
                    </Repeat>
                  </ProductPageContentLimit>
                </Repeat>
                <Repeat>
                  <ButtonPrimary title="Köp bilen online">Köp bilen online</ButtonPrimary>
                </Repeat>
              </ProductPageMainSection>

              <ProductPageMainSection>
                <Repeat>
                  <H2 noMargin>Begagnatgaranti</H2>
                </Repeat>
                <Repeat>
                  <Content>
                    <VisualHeading>Gör ett tryggt bilköp</VisualHeading>
                    <p>
                      Das WeltAuto är ett program från Volkswagengruppen. Det passar utmärkt för dig
                      som vill köpa en begagnad bil med garanti och flera andra förmåner.
                    </p>
                    <p>
                      Alla bilar är högst fem år gamla och har gått max 12 000 mil. För att en
                      begagnad bil ska bli Das WeltAuto-certifierad krävs godkänt på en omfattande
                      kvalitetskontroll. Kontrollen är ett kvitto på att bilen är i bästa skick.
                    </p>
                  </Content>
                </Repeat>
                <Repeat>
                  <CheckMarkList>
                    <CheckMarkListItem>12 mån/obegränsad körsträcka</CheckMarkListItem>
                    <CheckMarkListItem>Bytesrätt 10 dagar</CheckMarkListItem>
                    <CheckMarkListItem>Kontrollerad på 122 punkter</CheckMarkListItem>
                    <CheckMarkListItem>Max 5 år gamla bilar</CheckMarkListItem>
                    <CheckMarkListItem>Max 12 000 mil körsträcka</CheckMarkListItem>
                  </CheckMarkList>
                </Repeat>
                <Repeat>
                  <LogoBox logo="https://placehold.it/145x19" alt="Logotyp" wide />
                </Repeat>
                <Repeat>
                  <UtilityTextRight>
                    <ButtonClear>
                      <ButtonContent>Visa mer</ButtonContent>
                    </ButtonClear>
                  </UtilityTextRight>
                </Repeat>
              </ProductPageMainSection>

              <ProductPageMainSection>
                <Repeat>
                  <H2 noMargin>Historik</H2>
                </Repeat>
                <Repeat>
                  <Content>
                    <p>
                      Bilhandlare X bjuder på rapporten från Carfax som innehåller{' '}
                      <UtilityTextPrimaryBold>
                        2 registrerade uppgifter för ABC123
                      </UtilityTextPrimaryBold>
                      .
                    </p>
                  </Content>
                </Repeat>
                <Repeat>
                  <InputAction>
                    <InputActionInput>
                      <InputText placeholder="Fyll i din e-postadress" label="E-postadress" />
                    </InputActionInput>
                    <InputActionBtn>
                      <ButtonPrimary title="Köp bilen online" inputHeight>
                        Köp bilen online
                      </ButtonPrimary>
                    </InputActionBtn>
                  </InputAction>
                </Repeat>
                <Repeat>
                  <LogoBox
                    logo="https://placehold.it/145x19"
                    logo2x="https://placehold.it/290x38"
                    alt="Logotyp"
                    wide
                  />
                </Repeat>
                <Repeat>
                  <Content small>
                    <p>
                      Alla personuppgifter som skickas in till Bilhandlare X kommer att behandlas
                      enligt bestämmelserna i EU:s dataskyddsförordningen (GDPR).{' '}
                      <ButtonInline>Här</ButtonInline> kan du läsa mer om hur vi behandlar dina
                      personuppgifter.
                    </p>
                  </Content>
                </Repeat>
              </ProductPageMainSection>
            </ProductPageMain>
          </ProductPage>
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
