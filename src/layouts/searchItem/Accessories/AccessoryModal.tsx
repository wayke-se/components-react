import React from 'react';
import { marked } from 'marked';
import { Accessory } from '../../../@types/codegen/types';
import { numberSeparator } from '../../../utils/formats';
import { Repeat } from '../../../components/Repeat/index';
import { Image } from '../../../components/Image/index';
import { Link } from '../../../components/Link/index';
import { UtilityTextBold } from '../../../components/Utility/index';
import Modal from '../../../components/Modal/index';
import PriceBox from '../../../components/PriceBox/index';
import LogoBox from '../../../components/LogoBox/index';
import Content from '../../../components/Content/index';

interface AccesoryModalProps {
  accessory: Accessory;
  onClose: () => void;
}

const AccesoryModal = ({ accessory, onClose }: AccesoryModalProps) => {
  const priceList = [
    {
      label: 'Kontantpris',
      price: `${numberSeparator(accessory.price)} kr`,
      oldPrice: false,
    },
  ];

  if (accessory.salePrice) {
    priceList.push({
      label: 'Tidigare pris',
      price: `${numberSeparator(accessory.salePrice)} kr`,
      oldPrice: true,
    });
  }

  if (accessory.assemblyPrice) {
    priceList.push({
      label: 'Monteringskostnad',
      price: `${numberSeparator(accessory.assemblyPrice)} kr`,
      oldPrice: false,
    });
  }

  return (
    <Modal title={accessory.name} onClose={onClose}>
      {accessory.images?.[0] && (
        <Repeat>
          <Image src={`${accessory.images[0]}?w=632`} alt={`${accessory.name}`} />
        </Repeat>
      )}
      {accessory.logotype && (
        <Repeat>
          <LogoBox
            logo={`${accessory.logotype}?w=160`}
            logo2x={`${accessory.logotype}?w=320`}
            alt={accessory.manufacturer || 'Logotyp'}
            wide
          />
        </Repeat>
      )}
      <Repeat>
        <PriceBox prices={priceList} />
      </Repeat>

      <Repeat>
        <Content dangerouslySetInnerHTML={{ __html: marked(accessory.description) }} />
      </Repeat>
      {accessory.articleNumber && (
        <Repeat>
          <UtilityTextBold as="div">Art. nr.</UtilityTextBold>
          <div>{accessory.articleNumber}</div>
        </Repeat>
      )}
      {accessory.productPage && accessory.productPage.url && (
        <Repeat>
          <Link
            href={accessory.productPage.url}
            title={`Mer information om ${accessory.name}`}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            {accessory.productPage.title || 'Läs mer'} (öppnas i ny flik)
          </Link>
        </Repeat>
      )}
    </Modal>
  );
};

export default AccesoryModal;
