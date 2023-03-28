import React, { useState } from 'react';
import { Accessory } from '../../../@types/codegen/types';
import { ProductPageMainSection } from '../../../components/ProductPage';
import AccesoryModal from './AccessoryModal';

interface AccessoriesSectionProps {
  accessories?: Accessory[];
}

const AccessoriesSection = ({ accessories }: AccessoriesSectionProps) => {
  const [modal, setModal] = useState<Accessory | undefined>();

  const onOpenModal = (accessory: Accessory) => setModal(accessory);
  const onCloseModal = () => setModal(undefined);

  if (!accessories?.length) return null;

  return (
    <>
      {modal && <AccesoryModal accessory={modal} onClose={onCloseModal} />}
      <ProductPageMainSection>
        <div>
          <h2>Tillbehör</h2>
        </div>
        <div>
          <div>
            <p>Tillbehör som passar till detta fordon.</p>
          </div>
        </div>
      </ProductPageMainSection>
    </>
  );
};

export default AccessoriesSection;
