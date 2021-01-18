import React, { useMemo, useState, useCallback, useEffect } from 'react';

import Container from '../../components/Container/index';
import UspList from '../../components/UspList/index';
import { Repeat, RepeatSmall } from '../../components/Repeat/index';
import DataGrid from '../../components/DataGrid/index';
import PriceTable from '../../components/PriceTable/index';
import LogoBox from '../../components/LogoBox/index';
import Content from '../../components/Content/index';
import Blockquote from '../../components/Blockquote/index';
import ExtendContent from '../../components/ExtendContent/index';
import Gallery from '../../components/Gallery/index';
import { Page, PageSection } from '../../components/Page/index';
import {
  ProductPage,
  ProductPageMainSection,
  ProductPageAside,
  ProductPageMain,
  ProductPageAsideSection,
} from '../../components/ProductPage/index';
import { H1, H2 } from '../../components/Heading/index';
import { ButtonPrimary, ButtonContent, ButtonInlineLight } from '../../components/Button/index';
import { UtilityFontSizeSmall } from '../../components/Utility/index';
import { IconChevronLeft } from '../../components/Icon/index';
import useSearchItem from '../../hooks/useSearchItem';
import { notEmpty, numberSeparator, dateTimeFormat } from '../../utils/formats';
import { PortalNamespace, PortalElement } from '../../components/Portal/index';
import Modal from '../../components/Modal/index';
import { getSpecificationList } from '../../utils/specification';
import FinancialOptions from '../../components/FinancialOptions/index';
import InsuranceOptions from '../../components/InsuranceOptions/index';
import Ecom from '../../components/Ecom/index';
import ManufacturerPackageOption from './ManufacturerPackagesOption';
import CheckList from './CheckList';
import Related from './Related';
import PackageOptions from './PackageOptions';
import Branch from './Branch';
import useCentralStorage from '../../State/CentralStorage/useCentralStorage';
import Page404 from './Page404';
import PageLoading from './PageLoading';
import PubSub from '../../utils/pubsub/pubsub';
import Property from './Property';

export interface WaykeSearchItemProps {
  id: string;
  hashRoute?: boolean;
  pathRoute?: string;
  disableResetScrollOnInit?: boolean;
  placeholderImage?: string;
  onClickSearchItem?: (id: string) => void;
}

const WaykeSearchItem = ({
  id,
  hashRoute,
  pathRoute,
  disableResetScrollOnInit,
  placeholderImage,
  onClickSearchItem,
}: WaykeSearchItemProps) => {
  const [ecomModal, setEcomModal] = useState(false);
  const { loading, data: result } = useSearchItem(id);
  const toggleEcomModal = useCallback(() => setEcomModal(!ecomModal), [ecomModal]);
  const {
    vehicle: centralStorageVehicle,
    loading: loadingCentralStorageVehicle,
  } = useCentralStorage(result?.vehicle);

  useEffect(() => {
    if (!disableResetScrollOnInit) {
      window.scrollTo(0, 0);
    }
  }, []);

  const options = useMemo(
    () => result?.vehicle?.data?.options?.filter(notEmpty).map((opt) => ({ title: opt })),
    [result?.vehicle?.data?.options]
  );

  const onShowMoreSpecificationClick = useCallback(() => PubSub.publish('InformationClick'), []);
  const onShowMoreOptionsClick = useCallback(() => PubSub.publish('OptionsClick'), []);

  if (loading) {
    return <PageLoading />;
  }

  if (!result?.vehicle?.data) {
    return <Page404 />;
  }

  const { vehicle } = result;
  const contact = centralStorageVehicle?.contact;
  const branch = centralStorageVehicle?.branch;
  const {
    title,
    shortDescription,
    media,
    description,
    price,
    data,
    financialOptions,
    insuranceOptions,
    manufacturer,
    ecommerce,
    packageOptions,
    publishedAt,
  } = vehicle;
  const { fuelType, mileage, gearbox, manufactureYear, propertySet } = vehicle.data;
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
      {ecomModal && <Ecom vehicle={vehicle} manufacturer={manufacturer} onExit={toggleEcomModal} />}
      <Page>
        <PageSection large>
          <Container>
            <ProductPage>
              <ProductPageAside>
                <ProductPageAsideSection mobileOrder={1}>
                  {!pathRoute && hashRoute ? (
                    <Repeat>
                      <UtilityFontSizeSmall>
                        <ButtonInlineLight as="a" href="#" title="Tillbaka till bilsök">
                          <ButtonContent>
                            <IconChevronLeft block />
                          </ButtonContent>
                          <ButtonContent>Tillbaka till bilsök</ButtonContent>
                        </ButtonInlineLight>
                      </UtilityFontSizeSmall>
                    </Repeat>
                  ) : null}
                  {manufacturer?.logotype && (
                    <Repeat>
                      <LogoBox logo={manufacturer.logotype} alt={manufacturer.name} />
                    </Repeat>
                  )}
                  <Repeat>
                    <RepeatSmall>
                      <H1 noMargin>{title}</H1>
                    </RepeatSmall>
                    {shortDescription && (
                      <RepeatSmall>
                        <div>{shortDescription}</div>
                      </RepeatSmall>
                    )}
                    <RepeatSmall>
                      <UspList small items={uspList} />
                    </RepeatSmall>
                  </Repeat>
                </ProductPageAsideSection>

                <ProductPageAsideSection mobileOrder={2}>
                  <PriceTable price={price} />
                </ProductPageAsideSection>

                {(financialOptions.length > 0 || insuranceOptions.length > 0) && (
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
                  <CheckList
                    manufacturer={manufacturer}
                    packageOptions={packageOptions}
                    ecommerce={ecommerce}
                    branch={branch}
                    contact={centralStorageVehicle?.contact}
                    loadingCentralStorageVehicle={loadingCentralStorageVehicle}
                    toggleEcomModal={toggleEcomModal}
                  />
                </ProductPageAsideSection>
              </ProductPageAside>
              <ProductPageMain>
                <ProductPageAsideSection mobileOrder={3}>
                  <Gallery media={media} placeholderImage={placeholderImage} />
                </ProductPageAsideSection>

                <ProductPageMainSection>
                  <Repeat>
                    <H2 noMargin>Biluppgifter (OLD)</H2>
                  </Repeat>
                  <Repeat>
                    <ExtendContent actionTitle="Visa mer" onClick={onShowMoreSpecificationClick}>
                      <DataGrid specificationList={specificationList} />
                    </ExtendContent>
                  </Repeat>
                </ProductPageMainSection>

                <ProductPageMainSection>
                  <Repeat>
                    <H2 noMargin>Biluppgifter</H2>
                  </Repeat>
                  <Repeat>
                    <Content>
                      <p>Information direkt från Transportstyrelsen och tillverkaren.</p>
                    </Content>
                  </Repeat>
                  <Repeat>
                    <Property propertySet={propertySet} vehicleData={vehicle.data} />
                  </Repeat>
                </ProductPageMainSection>

                {description && (
                  <ProductPageMainSection>
                    <Blockquote
                      author={contact && contact.name ? contact.name : null}
                      date={
                        publishedAt
                          ? dateTimeFormat.format(publishedAt, dateTimeFormat.DayMonth)
                          : undefined
                      }
                      avatar={contact?.avatar || undefined}
                    >
                      {!!description && <p>{description}</p>}
                    </Blockquote>
                  </ProductPageMainSection>
                )}

                {(options?.length || 0) > 0 && (
                  <ProductPageMainSection>
                    <Repeat>
                      <H2 noMargin>Utrustning</H2>
                    </Repeat>
                    <Repeat>
                      <Content>
                        <p>Uppgifter om bilen som handlaren kompletterat med.</p>
                      </Content>
                    </Repeat>
                    <Repeat>
                      <ExtendContent actionTitle="Visa mer" onClick={onShowMoreOptionsClick}>
                        <UspList items={options} />
                      </ExtendContent>
                    </Repeat>
                  </ProductPageMainSection>
                )}

                <ProductPageMainSection>
                  <Branch branch={branch} loading={loadingCentralStorageVehicle} />
                  {ecommerce && ecommerce.enabled && (
                    <Repeat>
                      <ButtonPrimary
                        disabled={!!ecommerce.reserved}
                        title="Köp bilen online"
                        onClick={toggleEcomModal}
                      >
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
        <Related
          id={id}
          hashRoute={hashRoute}
          pathRoute={pathRoute}
          onClickSearchItem={onClickSearchItem}
        />
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

export default WaykeSearchItem;
