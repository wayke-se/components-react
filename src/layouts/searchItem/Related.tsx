import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import Container from '../../components/Container';
import { Repeat } from '../../components/Repeat';

import { PageSection } from '../../components/Page';
import SectionHeader from '../../components/SectionHeader';
import OverflowGrid from '../../components/OverflowGrid';
import ProductCard from '../../components/ProductCard';
import { H2 } from '../../components/Heading';
import useRelatedSearch from '../../State/RelatedSearch/useRelatedSearch';
import Loader from '../../components/Loader';
import { numberSeparator } from '../../utils/formats';
import PubSub from '../../utils/pubsub/pubsub';
import { regexPathGuid } from '../../utils/regex';

interface RelatedProps {
  id: string;
  hashRoute?: boolean;
  pathRoute?: string;
  authorizedReseller?: boolean;
  displayBranchName?: boolean;
  onClickSearchItem?: (id: string) => void;
}

const Related = ({
  id,
  hashRoute,
  pathRoute,
  authorizedReseller,
  displayBranchName,
  onClickSearchItem,
}: RelatedProps) => {
  const { t } = useTranslation();
  const { loading, response, moreLikeThisUrl } = useRelatedSearch(id, !!authorizedReseller);

  const onItemClicked = useCallback((id: string) => {
    PubSub.publish('ItemClicked', id);
    if (onClickSearchItem) {
      onClickSearchItem(id);
    }
  }, []);

  if (!response?.documentList.documents.length || response?.documentList.documents.length === 0) {
    return null;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <PageSection accent large className="wayke__theme wayke__color--accent-bg">
      <Container>
        {moreLikeThisUrl ? (
          <Repeat>
            <SectionHeader onClick={() => {}}>
              <H2 noMargin>{t('item.relatedVehicles')}</H2>
            </SectionHeader>
          </Repeat>
        ) : (
          <Repeat>
            <SectionHeader onClick={() => {}} actionTitle="Visa alla">
              <H2 noMargin>{t('item.latestVehicles')}</H2>
            </SectionHeader>
          </Repeat>
        )}

        <Repeat>
          <OverflowGrid
            accentBg
            columns={1.05}
            columnsSm={2.1}
            columnsMd={3}
            spacing={2}
            items={response?.documentList.documents.map((document) => {
              const prefix = pathRoute ? `/${pathRoute}` : '/';

              const r = regexPathGuid();

              const pathRouteUrl =
                window.location.pathname === '/'
                  ? `${prefix}${document._id}`
                  : r.test(`${pathRoute}${id}`)
                  ? window.location.pathname.replace(r, document._id)
                  : `${window.location.pathname}${prefix}${document._id}`;

              return (
                <ProductCard
                  key={document._id}
                  id={document._id}
                  onClick={onItemClicked}
                  title={document.title}
                  href={pathRoute ? pathRouteUrl : hashRoute ? `#${document._id}` : undefined}
                  imageFile={document.featuredImage?.files?.[0]}
                  description={document.shortDescription}
                  branchName={displayBranchName ? document.branches?.[0]?.name : undefined}
                  uspList={[
                    {
                      title: document.modelYear,
                    },
                    {
                      title: `${numberSeparator(
                        document.odometerReading?.value || document.mileage
                      )} ${t(`odometer.${document.odometerReading?.unit || 'ScandinavianMile'}`)}`,
                    },
                    {
                      title: document.gearboxType,
                    },
                    {
                      title: document.fuelType,
                    },
                  ]}
                  price={`${numberSeparator(document.price)} ${t('currency.default')}`}
                  oldPrice={
                    document.oldPrice !== undefined && document.price < document.oldPrice
                      ? `${numberSeparator(document.oldPrice)} ${t('currency.default')}`
                      : undefined
                  }
                  leasingPrice={
                    document.leasingPrice !== undefined
                      ? `${numberSeparator(document.leasingPrice)} ${t('currency.monthly')}`
                      : undefined
                  }
                  businessLeasingPrice={
                    document.businessLeasingPrice !== undefined
                      ? `${numberSeparator(document.businessLeasingPrice)} ${t('currency.monthly')}`
                      : undefined
                  }
                  pathRoute={pathRoute}
                />
              );
            })}
          />
        </Repeat>
      </Container>
    </PageSection>
  );
};

export default Related;
