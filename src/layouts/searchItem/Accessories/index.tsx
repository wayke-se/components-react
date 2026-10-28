import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AccessoryCard from '../../../components/AccessoryCard';
import Content from '../../../components/Content';
import { H2 } from '../../../components/Heading';
import OverflowGrid from '../../../components/OverflowGrid';
import { ProductPageMainSection } from '../../../components/ProductPage';
import { Repeat } from '../../../components/Repeat';
import { AdAccessory } from '../../../Gql/ad/types';
import { accessoryImages } from '../../../Gql/ad/view';
import { numberSeparator } from '../../../utils/formats';
import AccesoryModal from './AccessoryModal';

interface AccessoriesSectionProps {
  accessories: AdAccessory[];
}

const AccessoriesSection = ({ accessories }: AccessoriesSectionProps) => {
  const { t } = useTranslation();
  const [modal, setModal] = useState<AdAccessory | undefined>();

  const onOpenModal = (accessory: AdAccessory) => setModal(accessory);
  const onCloseModal = () => setModal(undefined);

  if (!accessories?.length) return null;

  return (
    <>
      {modal && <AccesoryModal accessory={modal} onClose={onCloseModal} />}
      <ProductPageMainSection>
        <Repeat>
          <H2 noMargin>{t('item.accessories.accessories')}</H2>
        </Repeat>
        <Repeat>
          <Content>
            <p>{t('item.accessories.accessoriesDescription')}</p>
          </Content>
        </Repeat>
        <Repeat>
          <OverflowGrid
            columns={1.05}
            columnsSm={2.1}
            columnsMd={2}
            spacing={2}
            items={accessories.map((accessory) => (
              <AccessoryCard
                key={accessory.id}
                title={accessory.name}
                image={
                  accessoryImages(accessory)[0]
                    ? {
                        src: `${accessoryImages(accessory)[0]}?w=539&h=303`,
                        alt: accessory.name,
                      }
                    : undefined
                }
                price={`${numberSeparator(accessory.price ?? 0)} ${t('currency.default')}`}
                preamble={accessory.shortDescription}
                readMoreCta={() => onOpenModal(accessory)}
              />
            ))}
          />
        </Repeat>
      </ProductPageMainSection>
    </>
  );
};

export default AccessoriesSection;
