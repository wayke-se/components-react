import { marked } from 'marked';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { MarketCode } from '../../@types/market';
import Blockquote from '../../components/Blockquote';
import { ButtonContent, ButtonInlineLight, ButtonPrimary } from '../../components/Button';
import Container from '../../components/Container';
import Content from '../../components/Content';
import ExtendContent from '../../components/ExtendContent';
import FinancialOptions from '../../components/FinancialOptions';
import Gallery from '../../components/Gallery';
import { H1, H2 } from '../../components/Heading';
import { IconChevronLeft } from '../../components/Icon';
import InsuranceOptions from '../../components/InsuranceOptions';
import LogoBox from '../../components/LogoBox';
import { Page, PageSection } from '../../components/Page';
import { PortalElement, PortalNamespace } from '../../components/Portal';
import PriceTable from '../../components/PriceTable';
import {
  ProductPage,
  ProductPageAside,
  ProductPageAsideSection,
  ProductPageMain,
  ProductPageMainSection,
} from '../../components/ProductPage';
import { Repeat, RepeatSmall } from '../../components/Repeat';
import UspList, { ItemProps } from '../../components/UspList';
import { UtilityFontSizeSmall } from '../../components/Utility';
import useInitializeTranslation from '../../hooks/useInitializeTranslation';
import useSearchItem from '../../hooks/useSearchItem';
import useCentralStorage from '../../State/CentralStorage/useCentralStorage';
import useSettings from '../../State/Settings/useSettings';
import { dateTimeFormat, notEmpty, numberSeparator } from '../../utils/formats';
import { i18nScoped } from '../../utils/I18n';
import PubSub from '../../utils/pubsub/pubsub';
import AccessoriesSection from './Accessories';
import Branch from './Branch';
import CheckList from './CheckList';
import DemoCarModal from './DemoCarModal';
import Documents from './Documents';
import ManufacturerPackageOption from './ManufacturerPackagesOption';
import PackageOptions from './PackageOptions';
import Page404 from './Page404';
import PageLoading from './PageLoading';
import Property from './Property';
import Related from './Related';
import useEcom from './useEcom';

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
  marketCode = 'SE',
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

  const { loading, data: result } = useSearchItem(id);
  const { vehicle: centralStorageVehicle, loading: loadingCentralStorageVehicle } =
    useCentralStorage(result?.vehicle);

  const contact = centralStorageVehicle?.contact;
  const branch = centralStorageVehicle?.branch;
  const ecomContext = useEcom(id, ecomSettings, branch);

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

  const onShowMoreOptionsClick = useCallback(
    () =>
      PubSub.publish('OptionsClick', {
        id,
        branchId: branch?.id,
        branchName: branch?.name,
      }),
    [branch]
  );

  if (!initialized) return null;

  if (loading) {
    return <PageLoading />;
  }

  if (!result?.vehicle?.data) {
    return <Page404 />;
  }

  const { vehicle } = result;
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
                      <FinancialOptions
                        id={id}
                        branch={branch}
                        financialOptions={financialOptions}
                        marketCode={marketCode}
                      />
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
                    id={id}
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
                  <Gallery
                    id={id}
                    branch={branch}
                    media={media}
                    placeholderImage={placeholderImage}
                  />
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
