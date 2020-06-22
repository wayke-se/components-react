import React, { useMemo, useState, useCallback } from 'react';

import Container from '../../components/Container';
import UspList from '../../components/UspList';
import Repeat from '../../components/Repeat';
import DataGrid from '../../components/DataGrid';
import PriceTable from '../../components/PriceTable';
import LogoBox from '../../components/LogoBox';
import ActionList from '../../components/ActionList';
import Content from '../../components/Content';
import Blockquote from '../../components/Blockquote';
import ExtendContent from '../../components/ExtendContent';
import Gallery from '../../components/Gallery';
import Loader from '../../components/Loader';
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
import { TableColumn, TableColumnRow, TableColumnCell } from '../../components/TableColumn';
import CheckMarkList, { CheckMarkListItem } from '../../components/CheckMarkList';
import useSearchItem from '../../hooks/useSearchItem';
import { notEmpty, numberSeparator } from '../../utils/formats';
import { PortalNamespace } from '../../components/Portal';
import PortalElement from '../../components/Portal/portal-element';
import Modal from '../../components/Modal';
import { getSpecificationList } from '../../utils/specification';
import OpeningHours from '../../components/OpeningHours';
import PhoneNumber from '../../components/PhoneNumber';
import FinancialOptions from '../../components/FinancialOptions';
import InsuranceOptions from '../../components/InsuranceOptions';
import Ecome from '../../components/Ecome';
import ManufacturerPackageOption from '../../components/ManufacturerPackagesOption';

interface DefaultSerchItemLayoutProps {
  id: string;
}

const DefaultSerchItemLayout = ({ id }: DefaultSerchItemLayoutProps) => {
  const [ecomModal, setEcomModal] = useState(false);
  const { loading, data: result } = useSearchItem(id);
  const toggleEcomModal = useCallback(() => setEcomModal(!ecomModal), [ecomModal]);

  const options = useMemo(
    () => result?.vehicle?.data?.options?.filter(notEmpty).map((opt) => ({ title: opt })),
    [result?.vehicle?.data?.options]
  );

  if (loading) {
    return (
      <Page>
        <PageSection large>
          <Container>
            <Loader />
          </Container>
        </PageSection>
      </Page>
    );
  }

  if (!result?.vehicle?.data) {
    return (
      <Page>
        <PageSection large>
          <Container>
            <H1 noMargin>404</H1>
          </Container>
        </PageSection>
      </Page>
    );
  }

  const {
    title,
    shortDescription,
    media,
    contact,
    description,
    price,
    data,
    branch,
    financialOptions,
    insuranceOptions,
    manufacturer,
    ecommerce,
  } = result.vehicle;
  const { fuelType, mileage, gearbox, manufactureYear } = result.vehicle.data;
  const specificationList = getSpecificationList(data);

  return (
    <>
      {ecomModal && (
        <Ecome vehicle={result.vehicle} manufacturer={manufacturer} onExit={toggleEcomModal} />
      )}
      <Page>
        <PageSection large>
          <Container>
            <ProductPage>
              <ProductPageAside>
                <ProductPageAsideSection mobileOrder={1}>
                  {manufacturer?.logotype && (
                    <Repeat>
                      <LogoBox logo={manufacturer.logotype} alt={manufacturer.name} />
                    </Repeat>
                  )}
                  <Repeat small>
                    <H1 noMargin>{title}</H1>
                  </Repeat>
                  {shortDescription && (
                    <Repeat small>
                      <div>{shortDescription}</div>
                    </Repeat>
                  )}
                  <Repeat small>
                    <UspList
                      small
                      items={[
                        {
                          title: manufactureYear,
                        },
                        {
                          title: `${numberSeparator(mileage)} mil`,
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
                  <PriceTable price={price} />
                </ProductPageAsideSection>

                {(financialOptions?.length > 0 || insuranceOptions?.length > 0) && (
                  <ProductPageAsideSection mobileOrder={4}>
                    {financialOptions.length > 0 && (
                      <FinancialOptions id={id} financialOptions={financialOptions} />
                    )}
                    {insuranceOptions.length > 0 && (
                      <InsuranceOptions id={id} insuranceOptions={insuranceOptions} />
                    )}
                  </ProductPageAsideSection>
                )}

                <ProductPageAsideSection mobileOrder={5}>
                  <Repeat>
                    <CheckMarkList>
                      {manufacturer?.packageOption?.title && (
                        <CheckMarkListItem>
                          <>
                            Inkl. <ButtonInline>{manufacturer.packageOption.title}</ButtonInline>{' '}
                            begagnatgaranti
                          </>
                        </CheckMarkListItem>
                      )}
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
                  {ecommerce && ecommerce.enabled && (
                    <Repeat>
                      <ButtonPrimary fullWidth onClick={toggleEcomModal}>
                        <ButtonContent>Köp bilen online</ButtonContent>
                      </ButtonPrimary>
                    </Repeat>
                  )}
                  <Repeat>
                    <ActionList contact={contact} />
                  </Repeat>
                </ProductPageAsideSection>
              </ProductPageAside>
              <ProductPageMain>
                <ProductPageAsideSection mobileOrder={3}>
                  <Gallery media={media} />
                </ProductPageAsideSection>

                <ProductPageMainSection>
                  <Repeat>
                    <H2 noMargin>Biluppgifter</H2>
                  </Repeat>
                  <Repeat>
                    <ExtendContent actionTitle="Visa mer">
                      <DataGrid specificationList={specificationList} />
                    </ExtendContent>
                  </Repeat>
                </ProductPageMainSection>

                {description && (
                  <ProductPageMainSection>
                    <Blockquote
                      author={contact && contact.name ? contact.name : null}
                      date="???"
                      avatar="https://placehold.it/40x40"
                    >
                      {!!description && <p>{description}</p>}
                    </Blockquote>
                  </ProductPageMainSection>
                )}

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
                    <H2
                      noMargin
                    >{`Den här bilen finns på vår anläggning i ${branch?.location?.city}`}</H2>
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
                                <ButtonContent>{`${branch?.location?.streetAddress}, ${branch?.location?.city}`}</ButtonContent>
                              </ButtonInlineBold>
                            </TableColumnCell>
                          </TableColumnRow>
                          <PhoneNumber phoneNumber="031-225566" />
                        </TableColumn>
                      </Repeat>
                      <Repeat>
                        <OpeningHours openingHours={branch?.openingHours} />
                      </Repeat>
                    </ProductPageContentLimit>
                  </Repeat>
                  {ecommerce && ecommerce.enabled && (
                    <Repeat>
                      <ButtonPrimary title="Köp bilen online" onClick={toggleEcomModal}>
                        Köp bilen online
                      </ButtonPrimary>
                    </Repeat>
                  )}
                </ProductPageMainSection>

                <ManufacturerPackageOption packageOption={manufacturer?.packageOption} />

                <ProductPageMainSection>
                  <Repeat>
                    <H2 noMargin>Begagnatgaranti</H2>
                  </Repeat>
                  <Repeat>
                    <Content>
                      <VisualHeading>Gör ett tryggt bilköp</VisualHeading>
                      <p>
                        Das WeltAuto är ett program från Volkswagengruppen. Det passar utmärkt för
                        dig som vill köpa en begagnad bil med garanti och flera andra förmåner.
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

                {/*
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
                */}
              </ProductPageMain>
            </ProductPage>
          </Container>
        </PageSection>

        {/* 
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
        */}
      </Page>
      {false && (
        <Modal title="Modal" onClose={() => {}}>
          <Content>
            <p>
              Priset är ett cirkapris och baserat på ditt avtals antal månader och din beräknade
              årliga körsträcka. Kostnad för försäkring och serviceavtal tillkommer. Kontakta
              säljare för komplett kostnadsförslag.{' '}
            </p>
          </Content>
        </Modal>
      )}
      <PortalElement id={PortalNamespace.DefaultPortal} />
    </>
  );
};

export default DefaultSerchItemLayout;
