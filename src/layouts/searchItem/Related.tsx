import React, { useCallback } from 'react';

import Container from '../../components/Container/index';
import { Repeat } from '../../components/Repeat/index';

import { PageSection } from '../../components/Page/index';
import SectionHeader from '../../components/SectionHeader/index';
import {
  OverflowGridList,
  OverflowGrid,
  OverflowGridItem,
} from '../../components/OverflowGrid/index';
import ProductCard from '../../components/ProductCard/index';
import { H2 } from '../../components/Heading/index';
import useRelatedSearch from '../../hooks/useRelatedSearch';
import Loader from '../../components/Loader/index';
import { numberSeparator } from '../../utils/formats';
import PubSub from '../../utils/pubsub/pubsub';

interface RelatedProps {
  id: string;
  hashRoute?: boolean;
  onClickSearchItem?: (id: string) => void;
}

const Related = ({ id, hashRoute, onClickSearchItem }: RelatedProps) => {
  const { loading, response, moreLikeThisUrl } = useRelatedSearch(id);

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
              <H2 noMargin>Relaterade fordon</H2>
            </SectionHeader>
          </Repeat>
        ) : (
          <Repeat>
            <SectionHeader onClick={() => {}} actionTitle="Visa alla">
              <H2 noMargin>Senast inkomna</H2>
            </SectionHeader>
          </Repeat>
        )}

        <Repeat>
          <OverflowGrid>
            <OverflowGridList>
              {response?.documentList.documents.map((document) => (
                <OverflowGridItem key={document._id}>
                  <ProductCard
                    id={document._id}
                    onClick={onItemClicked}
                    title={document.title}
                    href={hashRoute ? `#${document._id}` : undefined}
                    image={document.featuredImage?.files?.[0]?.url}
                    description={document.shortDescription}
                    uspList={[
                      {
                        title: document.modelYear,
                      },
                      {
                        title: document.modelSeries,
                      },
                      {
                        title: `${numberSeparator(document.mileage)} mil`,
                      },
                      {
                        title: document.gearboxType,
                      },
                      {
                        title: document.fuelType,
                      },
                    ]}
                    price={`${numberSeparator(document.price)} kr`}
                    oldPrice={`${numberSeparator(document.price)} kr`}
                  />
                </OverflowGridItem>
              ))}
            </OverflowGridList>
          </OverflowGrid>
        </Repeat>
      </Container>
    </PageSection>
  );
};

export default Related;
