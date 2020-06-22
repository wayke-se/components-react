import React from 'react';

import Container from '../../components/Container';
import Repeat from '../../components/Repeat';

import { PageSection } from '../../components/Page';
import SectionHeader from '../../components/SectionHeader';
import { OverflowGridList, OverflowGrid, OverflowGridItem } from '../../components/OverflowGrid';
import ProductCard from '../../components/ProductCard';
import { H2 } from '../../components/Heading';
import useRelatedSearch from '../../hooks/useRelatedSearch';
import { SearchItem_vehicle } from '../../@types/gql/SearchItem';
import { Spinner } from '../../components/Loader/wrapper';
import { numberSeparator } from '../../utils/formats';

interface RelatedProps {
  vehicle: SearchItem_vehicle;
  onClickSearchItem?: (id: string) => void;
}

const Related = ({ vehicle, onClickSearchItem }: RelatedProps) => {
  const { loading, response } = useRelatedSearch(vehicle.data.modelYear, vehicle.data.modelSeries);

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
                    href={`#${document._id}`}
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
