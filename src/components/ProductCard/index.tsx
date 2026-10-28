import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import useIsInViewport from '../../hooks/useIsInViewport';
import useRouter from '../../State/Router/useRouter';
import { DEFAULT_PLACEHOLDER_IMAGE } from '../../utils/constants';
import { imageUrl } from '../../utils/image';
import PubSub from '../../utils/pubsub/pubsub';
import UspList, { ItemProps } from '../UspList';
import {
  Content,
  ContentBody,
  ContentFooter,
  CurrentPrice,
  Description,
  Heading,
  Image,
  Img,
  Label,
  Link,
  OldPrice,
  Picture,
  PreHeading,
  Price,
  PriceCell,
  Source,
  Usp,
  Wrapper,
} from './wrapper';

interface Props {
  id: string;
  title: string;
  /** The ad's first image (a cfit url) */
  image?: string;
  branch?: { id: string; name?: string };
  placeholderImage?: string;
  description?: string;
  uspList?: ItemProps[];
  /** Left out when the ad has no cash price (0), as on wayke.se */
  price?: string;
  leasingPrice?: string;
  oldPrice?: string;
  branchName?: string;
  businessLeasingPrice?: string;
}

const ProductCard = ({
  id,
  title,
  image,
  placeholderImage,
  branch,
  branchName,
  description,
  uspList,
  price,
  oldPrice,
  leasingPrice,
  businessLeasingPrice,
}: Props) => {
  const { t } = useTranslation();
  const { itemHref, onLinkClick } = useRouter();
  const href = itemHref(id);

  const [containerRef, isVisible] = useIsInViewport<HTMLDivElement>({
    persistVisibility: true,
  });

  const onClick = useCallback(
    () => PubSub.publish('ItemClicked', { id, branchId: branch?.id, branchName: branch?.name }),
    [id, branch?.id, branch?.name]
  );

  const onHrefClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (href) onLinkClick(e, href);
    },
    [href, onLinkClick]
  );

  const size = { width: 770, height: 514 };
  const url = image ? imageUrl(image, size) : undefined;
  const webp = image ? imageUrl(image, { ...size, webp: true }) : undefined;

  return (
    <Wrapper onClick={onClick}>
      {href && <Link onClick={onHrefClick} href={href} title={title} aria-label={title} />}
      <Image ref={containerRef}>
        {isVisible && url ? (
          <>
            <Picture>
              {webp && <Source type="image/webp" srcSet={webp} />}
              <Img alt={title} src={url} />
            </Picture>
          </>
        ) : (
          <Picture>
            <Img src={placeholderImage || DEFAULT_PLACEHOLDER_IMAGE} />
          </Picture>
        )}
      </Image>
      <Content>
        <ContentBody>
          {branchName && <PreHeading>{branchName}</PreHeading>}
          <Heading>{title}</Heading>
          {description && <Description>{description}</Description>}
          {uspList && (
            <Usp>
              <UspList small items={uspList} />
            </Usp>
          )}
        </ContentBody>
        <ContentFooter>
          <Price>
            {price && (
              <PriceCell>
                {oldPrice ? (
                  <OldPrice>{oldPrice}</OldPrice>
                ) : (
                  <Label>{t('productCard.price')}</Label>
                )}
                <CurrentPrice>{price}</CurrentPrice>
              </PriceCell>
            )}
            {leasingPrice && (
              <PriceCell>
                <Label>{t('productCard.privateLeasing')}</Label>
                <CurrentPrice>{leasingPrice}</CurrentPrice>
              </PriceCell>
            )}
            {businessLeasingPrice && (
              <PriceCell>
                <Label>{t('productCard.businessLeasing')}</Label>
                <CurrentPrice>{businessLeasingPrice}</CurrentPrice>
              </PriceCell>
            )}
          </Price>
        </ContentFooter>
      </Content>
    </Wrapper>
  );
};

export default ProductCard;
