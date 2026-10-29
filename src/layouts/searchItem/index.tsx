import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ConversionOption, defaultConversionOptions } from '../../@types/conversion';
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
import { Ad } from '../../Gql/ad/types';
import useAd from '../../Gql/ad/useAd';
import {
  adEvent,
  contactPerson,
  discount,
  ecom,
  galleryMedia,
  leasingOffers,
  manufacturerPackage,
  packageOffers,
  price,
  publishedAt,
} from '../../Gql/ad/view';
import { AdContext } from '../../State/Ad/AdContext';
import useRouter from '../../State/Router/useRouter';
import useSettings from '../../State/Settings/useSettings';
import { dateTimeFormat, numberSeparator } from '../../utils/formats';
import { i18nScoped } from '../../utils/I18n';
import { markdownToHtml } from '../../utils/markdown';
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
  /** The id of the vehicle. Older ids are resolved, and the url is updated to the new one. */
  id: string;
  /** Keeps the scroll position when the vehicle page opens. By default it scrolls to the top. */
  disableResetScrollOnInit?: boolean;
  /** Url to an image for vehicles without images. */
  placeholderImage?: string;
  /** Sets the page title to the vehicle. */
  modifyDocumentTitleItem?: boolean;
  /** Shows the branch name on related vehicles and where the vehicle is located. */
  displayBranchName?: boolean;
  /** The buttons on the vehicle page. */
  conversionOptions?: ConversionOption[];
}

type ItemViewProps = Omit<WaykeSearchItemProps, 'id' | 'disableResetScrollOnInit'> & { ad: Ad };

const ItemView = ({
  ad,
  placeholderImage,
  modifyDocumentTitleItem,
  displayBranchName,
  conversionOptions,
}: ItemViewProps) => {
  const { ecom: ecomSettings, marketCode } = useSettings();
  const { searchHref } = useRouter();
  const ecomContext = useEcom(ad, ecomSettings, marketCode);
  // The buy button below the gallery follows the same conversion options as the sidebar.
  const ecomOption = (conversionOptions ?? defaultConversionOptions).find(
    (option) => option.type === 'ecom'
  );
  const ecommerce = ecom(ad);

  const [demoCarModal, setDemoCarModal] = useState(false);
  const onToggleDemoCarModal = useCallback(() => setDemoCarModal(!demoCarModal), [demoCarModal]);

  const item = ad.iteration?.item;
  const title = item?.displayName || ad.iteration?.displayName || ad.salesDescription?.title || '';
  const shortDescription = ad.salesDescription?.title;
  const description = ad.salesDescription?.enriched;
  const odometer = ad.iteration?.logistics?.odometerReading;
  const fuelType = item?.driveline?.fuelTypesString?.stringValue;
  const gearboxType = item?.attributes?.transmission?.formattedValue;
  const loans = ad.iteration?.commerce.paymentDetailsList || [];
  const leasing = leasingOffers(ad);
  const insuranceProvider = ad.iteration?.commerce.insuranceProvider;
  const manufacturerOffer = manufacturerPackage(ad);
  const contact = contactPerson(ad);
  const published = publishedAt(ad);
  const media = useMemo(() => galleryMedia(ad.media.items), [ad]);

  useEffect(() => {
    if (modifyDocumentTitleItem) {
      document.title = [item?.registrationNumber?.stringValue, title, shortDescription]
        .filter(Boolean)
        .join(' | ');
    }
  }, [ad]);

  const options = useMemo(() => (ad.equipment?.items || []).map((e) => ({ title: e.name })), [ad]);

  const onShowMoreOptionsClick = useCallback(
    () => PubSub.publish('OptionsClick', adEvent(ad)),
    [ad]
  );
  const startEcom = useCallback(() => ecomContext.current?.start(), []);

  const uspList: ItemProps[] = [];
  if (item?.modelYear?.intValue) uspList.push({ title: item.modelYear.intValue });
  if (ad.packaging.isDemoVersion) {
    uspList.push({ title: i18nScoped.t('item.demoCar'), onClick: onToggleDemoCarModal });
  }
  if (odometer) {
    uspList.push({
      title: `${numberSeparator(odometer.value)} ${i18nScoped.t(
        `odometer.${odometer.unit === 'KILOMETER' ? 'Kilometer' : 'ScandinavianMile'}`
      )}`,
    });
  }
  if (gearboxType) uspList.push({ title: gearboxType });
  if (fuelType) uspList.push({ title: fuelType });

  return (
    <AdContext.Provider value={ad}>
      <Page>
        <PageSection large>
          <Container>
            <ProductPage>
              <ProductPageAside>
                <ProductPageAsideSection mobileOrder={1}>
                  {searchHref && (
                    <Repeat>
                      <UtilityFontSizeSmall>
                        <ButtonInlineLight
                          as="a"
                          href={searchHref}
                          title={i18nScoped.t('navigation.backToSearch')}
                        >
                          <ButtonContent>
                            <IconChevronLeft block />
                          </ButtonContent>
                          <ButtonContent>{i18nScoped.t('navigation.backToSearch')}</ButtonContent>
                        </ButtonInlineLight>
                      </UtilityFontSizeSmall>
                    </Repeat>
                  )}
                  {manufacturerOffer?.image && (
                    <Repeat>
                      <LogoBox
                        logo={manufacturerOffer.image}
                        alt={item?.manufacturer?.stringValue || manufacturerOffer.title}
                      />
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

                {/* No price at all rather than "0 kr", as on wayke.se: leasing-only cars have none. */}
                {price(ad) > 0 && (
                  <ProductPageAsideSection mobileOrder={2}>
                    <PriceTable price={price(ad)} discount={discount(ad)} />
                  </ProductPageAsideSection>
                )}

                {(loans.length > 0 || leasing.length > 0 || insuranceProvider) && (
                  <ProductPageAsideSection mobileOrder={4}>
                    {(loans.length > 0 || leasing.length > 0) && (
                      <FinancialOptions loans={loans} leasing={leasing} />
                    )}
                    {insuranceProvider && <InsuranceOptions provider={insuranceProvider} />}
                  </ProductPageAsideSection>
                )}

                <ProductPageAsideSection mobileOrder={5}>
                  <CheckList
                    title={title}
                    conversionOptions={conversionOptions}
                    toggleEcomModal={ecomSettings ? startEcom : undefined}
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
                    <Property />
                  </Repeat>
                </ProductPageMainSection>
                {description && (
                  <ProductPageMainSection>
                    <Blockquote
                      author={contact?.name || null}
                      date={
                        published
                          ? dateTimeFormat.format(published, dateTimeFormat.DayMonth, marketCode)
                          : undefined
                      }
                      avatar={contact?.avatar}
                    >
                      <div dangerouslySetInnerHTML={{ __html: markdownToHtml(description) }} />
                    </Blockquote>
                  </ProductPageMainSection>
                )}

                {options.length > 0 && (
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

                <Documents documents={ad.iteration?.documents.public || []} />

                <AccessoriesSection accessories={ad.accessories} />

                <ProductPageMainSection>
                  <Branch branch={ad.branch} displayBranchName={displayBranchName} />
                  {ecomSettings && ecomOption && ecommerce.enabled && (
                    <Repeat>
                      <ButtonPrimary
                        disabled={ecommerce.reserved}
                        title={ecomOption.name || i18nScoped.t('item.actions.buyOnline')}
                        onClick={startEcom}
                      >
                        {ecomOption.name || i18nScoped.t('item.actions.buyOnline')}
                      </ButtonPrimary>
                    </Repeat>
                  )}
                </ProductPageMainSection>

                <PackageOptions packageOptions={packageOffers(ad)} />
                <ManufacturerPackageOption packageOption={manufacturerOffer} />
              </ProductPageMain>
            </ProductPage>
          </Container>
        </PageSection>
        <Related
          adId={ad.id}
          manufacturer={item?.manufacturer?.stringValue}
          placeholderImage={placeholderImage}
          displayBranchName={displayBranchName}
        />
      </Page>
      <PortalElement id={PortalNamespace.DefaultPortal} />
      {demoCarModal && <DemoCarModal onClose={onToggleDemoCarModal} />}
    </AdContext.Provider>
  );
};

/** The vehicle page. */
const WaykeSearchItem = ({ id, disableResetScrollOnInit, ...props }: WaykeSearchItemProps) => {
  const { publicApi } = useSettings();
  const { loading, ad } = useAd(id, publicApi);

  useEffect(() => {
    if (!disableResetScrollOnInit) {
      window.scrollTo(0, 0);
    }
    PubSub.publish('View', { type: 'item', id });
  }, []);

  if (loading) {
    return <PageLoading />;
  }

  if (!ad) {
    return <Page404 />;
  }

  return <ItemView ad={ad} {...props} />;
};

export default WaykeSearchItem;
