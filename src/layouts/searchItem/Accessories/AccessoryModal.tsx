import { marked } from 'marked';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Content from '../../../components/Content';
import { Image } from '../../../components/Image';
import { Link } from '../../../components/Link';
import LogoBox from '../../../components/LogoBox';
import Modal from '../../../components/Modal';
import PriceBox from '../../../components/PriceBox';
import { Repeat } from '../../../components/Repeat';
import { UtilityTextBold } from '../../../components/Utility';
import { AdAccessory } from '../../../Gql/ad/types';
import { accessoryImages } from '../../../Gql/ad/view';
import { numberSeparator } from '../../../utils/formats';

interface AccesoryModalProps {
  accessory: AdAccessory;
  onClose: () => void;
}

const AccesoryModal = ({ accessory, onClose }: AccesoryModalProps) => {
  const { t } = useTranslation();
  const image = accessoryImages(accessory)[0];
  const priceList = [
    {
      label: t('item.accessories.price'),
      price: `${numberSeparator(accessory.price ?? 0)} ${t('currency.default')}`,
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
      {image && (
        <Repeat>
          <Image src={`${image}?w=632`} alt={`${accessory.name}`} />
        </Repeat>
      )}
      {accessory.logoUrl && (
        <Repeat>
          <LogoBox
            logo={`${accessory.logoUrl}?w=160`}
            logo2x={`${accessory.logoUrl}?w=320`}
            alt={accessory.manufacturer || t('common.logotype') || ''}
            wide
          />
        </Repeat>
      )}
      <Repeat>
        <PriceBox prices={priceList} />
      </Repeat>

      <Repeat>
        <Content dangerouslySetInnerHTML={{ __html: marked(accessory.longDescription || '') }} />
      </Repeat>
      {accessory.articleNumber && (
        <Repeat>
          <UtilityTextBold as="div">{t('item.accessories.articleNumberShort')}</UtilityTextBold>
          <div>{accessory.articleNumber}</div>
        </Repeat>
      )}
      {accessory.productPageLink && (
        <Repeat>
          <Link
            href={accessory.productPageLink}
            title={
              t('item.accessories.moreInformationAboutAccessory', {
                accessory: accessory.name,
              }) || ''
            }
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            {accessory.productPageLinkText || t('common.readMore')} ({t('common.opensInNewTab')})
          </Link>
        </Repeat>
      )}
    </Modal>
  );
};

export default AccesoryModal;
