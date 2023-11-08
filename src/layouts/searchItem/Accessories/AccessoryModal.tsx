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
import { useTranslation } from 'react-i18next';

interface AccesoryModalProps {
  accessory: Accessory;
  onClose: () => void;
}

const AccesoryModal = ({ accessory, onClose }: AccesoryModalProps) => {
  const { t } = useTranslation();
  const priceList = [
    {
      label: t('item.accessories.price'),
      price: `${numberSeparator(accessory.price)} ${t('currency.default')}`,
      oldPrice: false,
    },
  ];

  if (accessory.salePrice) {
    priceList.push({
      label: t('item.accessories.oldPrice'),
      price: `${numberSeparator(accessory.salePrice)} ${t('currency.default')}`,
      oldPrice: true,
    });
  }

  if (accessory.assemblyPrice) {
    priceList.push({
      label: t('item.accessories.installationCost'),
      price: `${numberSeparator(accessory.assemblyPrice)} ${t('currency.default')}`,
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
            alt={accessory.manufacturer || t('common.logotype') || ''}
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
          <UtilityTextBold as="div">{t('item.accessories.articleNumberShort')}</UtilityTextBold>
          <div>{accessory.articleNumber}</div>
        </Repeat>
      )}
      {accessory.productPage && accessory.productPage.url && (
        <Repeat>
          <Link
            href={accessory.productPage.url}
            title={
              t('item.accessories.moreInformationAboutAccessory', {
                accessory: accessory.name,
              }) || ''
            }
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            {accessory.productPage.title || t('common.readMore')} ({t('common.opensInNewTab')})
          </Link>
        </Repeat>
      )}
    </Modal>
  );
};

export default AccesoryModal;
