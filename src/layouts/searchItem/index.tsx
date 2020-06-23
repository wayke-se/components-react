import React, { useMemo, useState, useCallback } from 'react';

import Container from '../../components/Container';
import UspList from '../../components/UspList';
import Repeat from '../../components/Repeat';
import DataGrid from '../../components/DataGrid';
import PriceTable from '../../components/PriceTable';
import LogoBox from '../../components/LogoBox';
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
import { H1, H2 } from '../../components/Heading';
import { ButtonPrimary, ButtonContent, ButtonInlineBold } from '../../components/Button';
import { TableColumn, TableColumnRow, TableColumnCell } from '../../components/TableColumn';
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
import ManufacturerPackageOption from './ManufacturerPackagesOption';
import Map from '../../components/Map';
import CheckList from './CheckList';
import Related from './Related';
import PackageOptions from './PackageOptions';

interface DefaultSearchItemLayoutProps {
  id: string;
  onClickSearchItem?: (id: string) => void;
}

const DefaultSearchItemLayout = ({ id, onClickSearchItem }: DefaultSearchItemLayoutProps) => {
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

  const { vehicle } = result;
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
    packageOptions,
  } = vehicle;
  const { fuelType, mileage, gearbox, manufactureYear } = vehicle.data;
  const specificationList = getSpecificationList(data);

  const uspList = [
    {
      title: manufactureYear,
    },
    {
      title: `${numberSeparator(mileage)} mil`,
    },
  ];
  if (gearbox) {
    uspList.push({ title: gearbox });
  }

  if (fuelType) {
    uspList.push({ title: fuelType });
  }

  return (
    <>
      {ecomModal && (
        <Ecome vehicle={vehicle} manufacturer={manufacturer} onExit={toggleEcomModal} />
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
                    <UspList small items={uspList} />
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
                  <CheckList vehicle={vehicle} toggleEcomModal={toggleEcomModal} />
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
                      avatar={contact?.avatar || 'https://placehold.it/40x40'}
                    >
                      {!!description && <p>{description}</p>}
                    </Blockquote>
                  </ProductPageMainSection>
                )}

                {options && options.length > 0 && (
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
                )}

                <ProductPageMainSection>
                  <Repeat>
                    <H2 noMargin>
                      {branch?.location?.city
                        ? `Den här bilen finns på vår anläggning i ${branch?.location?.city}`
                        : 'Kontakt'}
                    </H2>
                  </Repeat>
                  <Repeat>
                    <Map position={branch?.location?.position} />
                  </Repeat>
                  <Repeat>
                    <ProductPageContentLimit>
                      <Repeat>
                        <TableColumn>
                          {branch?.location?.streetAddress && branch?.location?.city && (
                            <TableColumnRow>
                              <TableColumnCell>Adress</TableColumnCell>
                              <TableColumnCell>
                                <ButtonInlineBold>
                                  <ButtonContent>{`${branch?.location?.streetAddress}, ${branch?.location?.city}`}</ButtonContent>
                                </ButtonInlineBold>
                              </TableColumnCell>
                            </TableColumnRow>
                          )}
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
                <PackageOptions packageOptions={packageOptions} />
                <ManufacturerPackageOption packageOption={manufacturer?.packageOption} />
              </ProductPageMain>
            </ProductPage>
          </Container>
        </PageSection>
        <Related vehicle={vehicle} onClickSearchItem={onClickSearchItem} />
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

export default DefaultSearchItemLayout;
