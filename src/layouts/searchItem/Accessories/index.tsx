import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Accessory } from '../../../@types/codegen/types';
import { numberSeparator } from '../../../utils/formats';
import { ProductPageMainSection } from '../../../components/ProductPage';
import { Repeat } from '../../../components/Repeat';
import { H2 } from '../../../components/Heading';
import Content from '../../../components/Content';
import AccessoryCard from '../../../components/AccessoryCard';
import OverflowGrid from '../../../components/OverflowGrid';
import AccesoryModal from './AccessoryModal';

interface AccessoriesSectionProps {
  accessories?: Accessory[];
}

const AccessoriesSection = ({ accessories }: AccessoriesSectionProps) => {
  const { t } = useTranslation();
  const [modal, setModal] = useState<Accessory | undefined>();

  const onOpenModal = (accessory: Accessory) => setModal(accessory);
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
                  accessory.images?.[0]
                    ? {
                        src: `${accessory.images?.[0]}?w=539&h=303`,
                        alt: accessory.name,
                      }
                    : undefined
                }
                price={`${numberSeparator(accessory.price)} ${t('currency.default')}`}
                preamble={accessory.excerpt}
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
