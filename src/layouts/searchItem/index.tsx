import React, { useMemo, useRef, useCallback, useState, useEffect } from 'react';
import WaykeEcomWeb from '@wayke-se/ecom-web';

import Container from '../../components/Container/index';
import UspList, { ItemProps } from '../../components/UspList/index';
import { Repeat, RepeatSmall } from '../../components/Repeat/index';
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
import FinancialOptions from '../../components/FinancialOptions/index';
import InsuranceOptions from '../../components/InsuranceOptions/index';
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
import DemoCarModal from './DemoCarModal';
import useSettings from '../../State/Settings/useSettings';
import Documents from './Documents';
import AccessoriesSection from './Accessories';

export interface WaykeSearchItemProps {
  id: string;
  hashRoute?: boolean;
  pathRoute?: string;
  disableResetScrollOnInit?: boolean;
  placeholderImage?: string;
  modifyDocumentTitleItem?: boolean;
  displayBranchName?: boolean;
  onClickSearchItem?: (id: string) => void;
}

const WaykeSearchItem = ({
  id,
  hashRoute,
  pathRoute,
  disableResetScrollOnInit,
  placeholderImage,
  modifyDocumentTitleItem,
  displayBranchName,
  onClickSearchItem,
}: WaykeSearchItemProps) => {
  const { ecomSettings } = useSettings();
  const ecomContext = useRef<WaykeEcomWeb | undefined>();
  const { loading, data: result } = useSearchItem(id);
  const { vehicle: centralStorageVehicle, loading: loadingCentralStorageVehicle } =
    useCentralStorage(result?.vehicle);

  const [demoCarModal, setDemoCarModal] = useState(false);
  const onToggleDemoCarModal = useCallback(() => setDemoCarModal(!demoCarModal), [demoCarModal]);

  useEffect(() => {
    if (ecomSettings) {
      ecomContext.current = new WaykeEcomWeb({
        id,
        ecomSdkConfig: {
          api: {
            address: ecomSettings.url,
          },
          bankIdThumbprint: ecomSettings?.bankIdThumbprint,
        },
        logo: ecomSettings.serviceLogotypeUrl,
        logoX2: ecomSettings.serviceLogotypeUrl,
        onEvent(view, event, currentStep?, data?) {
          PubSub.publish('EcomOnUserEvent', view, event, currentStep, data);
        },
      });
    }
    return () => {
      if (ecomContext.current) {
        ecomContext.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (!disableResetScrollOnInit) {
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    if (result?.vehicle?.data && modifyDocumentTitleItem) {
      const { vehicle } = result;
      const { registrationNumber } = vehicle.data;
      document.title = `${registrationNumber} | ${vehicle.title} | ${vehicle.shortDescription}`;
    }
  }, [result]);

  const options = useMemo(
    () => result?.vehicle?.data?.options?.filter(notEmpty).map((opt) => ({ title: opt })),
    [result?.vehicle?.data?.options]
  );

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
    discount,
    financialOptions,
    manufacturer,
    ecommerce,
    packageOptions,
    publishedAt,
    documents,
    availableFrom,
    flags,
  } = vehicle;
  const insuranceOptions = centralStorageVehicle?.insuranceOptions
    ? centralStorageVehicle.insuranceOptions
    : vehicle.insuranceOptions;
  const { fuelType, mileage, gearbox, modelYear, propertySet } = vehicle.data;

  const uspList: ItemProps[] = [
    {
      title: modelYear,
    },
  ];

  if (flags?.demoVersion) {
    uspList.push({
      title: 'Demobil',
      onClick: onToggleDemoCarModal,
    });
  }

  uspList.push({
    title: `${numberSeparator(mileage)} mil`,
  });

  if (gearbox) {
    uspList.push({ title: gearbox });
  }

  if (fuelType) {
    uspList.push({ title: fuelType });
  }

  return (
    <>
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
                  <PriceTable price={price} discount={discount || undefined} />
                </ProductPageAsideSection>

                {(financialOptions.length > 0 || insuranceOptions.length > 0) && (
                  <ProductPageAsideSection mobileOrder={4}>
                    {financialOptions.length > 0 && (
                      <FinancialOptions id={id} financialOptions={financialOptions} />
                    )}
                    {insuranceOptions.length > 0 && (
                      <InsuranceOptions
                        id={id}
                        branch={centralStorageVehicle?.branch}
                        insuranceOptions={insuranceOptions}
                      />
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
                    availableFrom={availableFrom}
                    toggleEcomModal={() => ecomContext.current?.start()}
                  />
                </ProductPageAsideSection>
              </ProductPageAside>
              <ProductPageMain>
                <ProductPageAsideSection mobileOrder={3}>
                  <Gallery media={media} placeholderImage={placeholderImage} />
                </ProductPageAsideSection>

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
                        <p>Kompletterande uppgifter om bilen.</p>
                      </Content>
                    </Repeat>
                    <Repeat>
                      <ExtendContent actionTitle="Visa mer" onClick={onShowMoreOptionsClick}>
                        <UspList items={options} />
                      </ExtendContent>
                    </Repeat>
                  </ProductPageMainSection>
                )}

                <Documents documents={documents} />

                <ProductPageMainSection>
                  <Branch
                    branch={branch}
                    displayBranchName={displayBranchName}
                    loading={loadingCentralStorageVehicle}
                  />
                  {ecommerce && ecommerce.enabled && (
                    <Repeat>
                      <ButtonPrimary
                        disabled={!!ecommerce.reserved}
                        title="Köp bilen online"
                        onClick={() => ecomContext.current?.start()}
                      >
                        Köp bilen online
                      </ButtonPrimary>
                    </Repeat>
                  )}
                </ProductPageMainSection>

                <AccessoriesSection accessories={accessories} />

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
          authorizedReseller={!!branch?.flags?.authorizedReseller}
          displayBranchName={displayBranchName}
          onClickSearchItem={onClickSearchItem}
        />
      </Page>
      <PortalElement id={PortalNamespace.DefaultPortal} />
      {demoCarModal && <DemoCarModal onClose={onToggleDemoCarModal} />}
    </>
  );
};

export default WaykeSearchItem;
