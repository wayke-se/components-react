import React from 'react';
import { useTranslation } from 'react-i18next';
import Container from '../../components/Container';
import { H2 } from '../../components/Heading';
import OverflowGrid from '../../components/OverflowGrid';
import { PageSection } from '../../components/Page';
import HitCard from '../../components/ProductCard/HitCard';
import { Repeat } from '../../components/Repeat';
import SectionHeader from '../../components/SectionHeader';
import useRelatedAds from '../../Gql/ad/useRelatedAds';
import useSettings from '../../State/Settings/useSettings';

interface RelatedProps {
  adId: string;
  manufacturer?: string;
  placeholderImage?: string;
  displayBranchName?: boolean;
}

/** The latest cars of the same make. */
const Related = ({ adId, manufacturer, placeholderImage, displayBranchName }: RelatedProps) => {
  const { t } = useTranslation();
  const { publicApi } = useSettings();
  const { hits } = useRelatedAds(publicApi, adId, manufacturer);

  if (!hits?.length) {
    return null;
  }

  return (
    <PageSection accent large className="wayke__theme wayke__color--accent-bg">
      <Container>
        <Repeat>
          <SectionHeader>
            <H2 noMargin>{t('item.relatedVehicles')}</H2>
          </SectionHeader>
        </Repeat>
        <Repeat>
          <OverflowGrid
            accentBg
            columns={1.05}
            columnsSm={2.1}
            columnsMd={3}
            spacing={2}
            items={hits.map((hit) => (
              <HitCard
                key={hit.ad.id}
                hit={hit}
                placeholderImage={placeholderImage}
                displayBranchName={displayBranchName}
              />
            ))}
          />
        </Repeat>
      </Container>
    </PageSection>
  );
};

export default Related;
