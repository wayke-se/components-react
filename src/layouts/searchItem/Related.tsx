import React from 'react';

import Container from '../../components/Container/index';
import Repeat from '../../components/Repeat/index';

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
import { Spinner } from '../../components/Loader/wrapper';
import { numberSeparator } from '../../utils/formats';

interface RelatedProps {
  modelYear: number;
  modelSeries?: string | null;
  hashRoute?: boolean;
  onClickSearchItem?: (id: string) => void;
}

const Related = ({ modelYear, modelSeries, hashRoute, onClickSearchItem }: RelatedProps) => {
  const { loading, response } = useRelatedSearch(modelYear, modelSeries);

  if (response?.documentList.documents.length === 0) {
    return null;
  }

  if (loading) {
    return <Spinner />;
  }

  return (
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
              {response?.documentList.documents.map((document) => (
                <OverflowGridItem key={document._id}>
                  <ProductCard
                    id={document._id}
                    onClick={onClickSearchItem}
                    title={document.title}
                    href={hashRoute ? `#${document._id}` : undefined}
                    image={
                      `${document.featuredImage?.files?.[0]?.url}?w=567&q=72` ||
                      'http://placehold.it/600x400'
                    }
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
