import React, { useMemo, useCallback, useState, useEffect } from 'react';

import Container from '../../components/Container';
import UspList, { ItemProps } from '../../components/UspList';
import { Repeat, RepeatSmall } from '../../components/Repeat';
import PriceTable from '../../components/PriceTable';
import LogoBox from '../../components/LogoBox';
import Content from '../../components/Content';
import Blockquote from '../../components/Blockquote';
import ExtendContent from '../../components/ExtendContent';
import Gallery from '../../components/Gallery';
import { Page, PageSection } from '../../components/Page';
import {
  ProductPage,
  ProductPageMainSection,
  ProductPageAside,
  ProductPageMain,
  ProductPageAsideSection,
} from '../../components/ProductPage';
import { H1, H2 } from '../../components/Heading';
import { ButtonPrimary, ButtonContent, ButtonInlineLight } from '../../components/Button';
import { UtilityFontSizeSmall } from '../../components/Utility';
import { IconChevronLeft } from '../../components/Icon';
import useSearchItem from '../../hooks/useSearchItem';
import { notEmpty, numberSeparator, dateTimeFormat } from '../../utils/formats';
import { PortalNamespace, PortalElement } from '../../components/Portal';
import FinancialOptions from '../../components/FinancialOptions';
import InsuranceOptions from '../../components/InsuranceOptions';
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
import { MarketCode } from '../../@types/market';
import useInitializeTranslation from '../../hooks/useInitializeTranslation';
import useEcom from './useEcom';
import { i18nScoped } from '../../utils/I18n';
import { marked } from 'marked';

export interface WaykeSearchItemProps {
  marketCode?: MarketCode;
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
  marketCode,
  id,
  hashRoute,
  pathRoute,
  disableResetScrollOnInit,
  placeholderImage,
  modifyDocumentTitleItem,
  displayBranchName,
  onClickSearchItem,
}: WaykeSearchItemProps) => {
  const initialized = useInitializeTranslation(marketCode);
  const { ecomSettings } = useSettings();

  const ecomContext = useEcom(id, ecomSettings);

  const { loading, data: result } = useSearchItem(id);
  const { vehicle: centralStorageVehicle, loading: loadingCentralStorageVehicle } =
    useCentralStorage(result?.vehicle);

  const [demoCarModal, setDemoCarModal] = useState(false);
  const onToggleDemoCarModal = useCallback(() => setDemoCarModal(!demoCarModal), [demoCarModal]);

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

  if (!initialized) return null;

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
    accessories,
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
  const { fuelType, mileage, gearboxType, odometerReading, modelYear, propertySet } = vehicle.data;

  const uspList: ItemProps[] = [
    {
      title: modelYear,
    },
  ];

  if (flags?.demoVersion) {
    uspList.push({
      title: i18nScoped.t('item.demoCar'),
      onClick: onToggleDemoCarModal,
    });
  }

  uspList.push({
    title: `${numberSeparator(odometerReading?.value || mileage)} ${i18nScoped.t(
      `odometer.${odometerReading?.unit || 'ScandinavianMile'}`
    )}`,
  });

  if (gearboxType) {
    uspList.push({ title: gearboxType });
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
                        <ButtonInlineLight
                          as="a"
                          href="#"
                          title={i18nScoped.t('navigation.backToSearch')}
                        >
                          <ButtonContent>
                            <IconChevronLeft block />
                          </ButtonContent>
                          <ButtonContent>{i18nScoped.t('navigation.backToSearch')}</ButtonContent>
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
                    marketCode={marketCode}
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
                    <H2 noMargin>{i18nScoped.t('item.carData')}</H2>
                  </Repeat>
                  <Repeat>
                    <Content>
                      <p>{i18nScoped.t('item.carDataDescription')}</p>
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
                          ? dateTimeFormat.format(publishedAt, dateTimeFormat.DayMonth, marketCode)
                          : undefined
                      }
                      avatar={contact?.avatar || undefined}
                    >
                      {!!description && (
                        <div dangerouslySetInnerHTML={{ __html: marked(description) }} />
                      )}
                    </Blockquote>
                  </ProductPageMainSection>
                )}

                {(options?.length || 0) > 0 && (
                  <ProductPageMainSection>
                    <Repeat>
                      <H2 noMargin>{i18nScoped.t('item.equipment')}</H2>
                    </Repeat>
                    <Repeat>
                      <Content>
                        <p>{i18nScoped.t('item.equipmentDescription')}</p>
                      </Content>
                    </Repeat>
                    <Repeat>
                      <ExtendContent
                        actionTitle={i18nScoped.t('common.showMore')}
                        onClick={onShowMoreOptionsClick}
                      >
                        <UspList items={options} />
                      </ExtendContent>
                    </Repeat>
                  </ProductPageMainSection>
                )}

                <Documents documents={documents} />

                <AccessoriesSection accessories={accessories} />

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
