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
import Blockquote from '../../components/Blockquote';
import ProductCard from '../../components/ProductCard';
import SectionHeader from '../../components/SectionHeader';
import ExtendContent from '../../components/ExtendContent';
import Gallery from '../../components/Gallery';
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
  ButtonContent,
  ButtonInline,
  ButtonInlineBold,
} from '../../components/Button';
import {
  UtilityTextPrimary,
  UtilityTextPrimaryBold,
  UtilityTextBold,
} from '../../components/Utility';
import { TableColumn, TableColumnRow, TableColumnCell } from '../../components/TableColumn';
import { OverflowGrid, OverflowGridList, OverflowGridItem } from '../../components/OverflowGrid';
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
      <PageSection large>
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
                <Gallery
                  images={[
                    {
                      url:
                        'https://cdn.wayke.se/media/8b77f417-1229-4aff-b331-3e086ac2b033/19c34cad-8696-432f-a06e-a63b06acd18c/1170x',
                    },
                    {
                      url:
                        'https://cdn.wayke.se/media/c50f7097-52d0-4d06-8deb-f818eccbe625/a14059a5-963b-4ca2-acbe-11710eabac96/1170x',
                    },
                    {
                      url:
                        'https://cdn.wayke.se/media/e2890b9e-918d-4378-91d5-206bb07a7fec/8e5c768e-f332-42b8-bfa7-176613f1f06d/1170x',
                    },
                  ]}
                />
              </ProductPageAsideSection>

              <ProductPageMainSection>
                <Repeat>
                  <H2 noMargin>Biluppgifter</H2>
                </Repeat>
                <Repeat>
                  <ExtendContent actionTitle="Visa mer">
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
                  </ExtendContent>
                </Repeat>
              </ProductPageMainSection>

              <ProductPageMainSection>
                <Blockquote
                  author="Anders Andersson, säljare"
                  date="1 mars 2020"
                  avatar="https://placehold.it/40x40"
                >
                  <p>
                    Passa på att köpa en riktigt fin C 200 Coupé med AMG Sport-paket. Det ingår både
                    sommar och vinterdäck. En liten repa på passagerardörren.{' '}
                  </p>
                </Blockquote>
              </ProductPageMainSection>

              <ProductPageMainSection>
                <Repeat>
                  <H2 noMargin>Utrustning</H2>
                </Repeat>
                <Repeat>
                  <ExtendContent actionTitle="Visa mer">
                    <UspList items={options} />
                  </ExtendContent>
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

      <PageSection accent large>
        <Container>
          <Repeat>
            <SectionHeader onClick={() => {}} actionTitle="Se alla">
              <H2 noMargin>Senast inkomna</H2>
            </SectionHeader>
          </Repeat>
          <Repeat>
            <OverflowGrid>
              <OverflowGridList>
                <OverflowGridItem>
                  <ProductCard
                    id="684f2548-1250-4ae2-bcb8-e8aec11cb739"
                    title="Mazda CX-5"
                    href="#684f2548-1250-4ae2-bcb8-e8aec11cb739"
                    image="http://placehold.it/600x400"
                    description="Optimum 2.2 DE 175hk Aut AWD – Dragkrok"
                    uspList={[
                      {
                        title: '2017',
                      },
                      {
                        title: '6851 mil',
                      },
                      {
                        title: 'Automat',
                      },
                      {
                        title: 'Diesel',
                      },
                    ]}
                    price="268 800 kr"
                    oldPrice="289 000 kr"
                  />
                </OverflowGridItem>
                <OverflowGridItem>
                  <ProductCard
                    id="684f2548-1250-4ae2-bcb8-e8aec11cb739"
                    title="Mazda CX-5"
                    href="#684f2548-1250-4ae2-bcb8-e8aec11cb739"
                    image="http://placehold.it/600x400"
                    description="Optimum 2.2 DE 175hk Aut AWD – Dragkrok"
                    uspList={[
                      {
                        title: '2017',
                      },
                      {
                        title: '6851 mil',
                      },
                      {
                        title: 'Automat',
                      },
                      {
                        title: 'Diesel',
                      },
                    ]}
                    price="268 800 kr"
                    oldPrice="289 000 kr"
                  />
                </OverflowGridItem>
                <OverflowGridItem>
                  <ProductCard
                    id="684f2548-1250-4ae2-bcb8-e8aec11cb739"
                    title="Mazda CX-5"
                    href="#684f2548-1250-4ae2-bcb8-e8aec11cb739"
                    image="http://placehold.it/600x400"
                    description="Optimum 2.2 DE 175hk Aut AWD – Dragkrok"
                    uspList={[
                      {
                        title: '2017',
                      },
                      {
                        title: '6851 mil',
                      },
                      {
                        title: 'Automat',
                      },
                      {
                        title: 'Diesel',
                      },
                    ]}
                    price="268 800 kr"
                    oldPrice="289 000 kr"
                  />
                </OverflowGridItem>
                <OverflowGridItem>
                  <ProductCard
                    id="684f2548-1250-4ae2-bcb8-e8aec11cb739"
                    title="Mazda CX-5"
                    href="#684f2548-1250-4ae2-bcb8-e8aec11cb739"
                    image="http://placehold.it/600x400"
                    description="Optimum 2.2 DE 175hk Aut AWD – Dragkrok"
                    uspList={[
                      {
                        title: '2017',
                      },
                      {
                        title: '6851 mil',
                      },
                      {
                        title: 'Automat',
                      },
                      {
                        title: 'Diesel',
                      },
                    ]}
                    price="268 800 kr"
                    oldPrice="289 000 kr"
                  />
                </OverflowGridItem>
              </OverflowGridList>
            </OverflowGrid>
          </Repeat>
        </Container>
      </PageSection>
    </Page>
  );
};

export default DefaultSerchItemLayout;
