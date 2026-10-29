import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import useIsInViewport from '../../hooks/useIsInViewport';
import useRouter from '../../State/Router/useRouter';
import { DEFAULT_PLACEHOLDER_IMAGE } from '../../utils/constants';
import PubSub from '../../utils/pubsub/pubsub';
import ResponsiveImage from '../ResponsiveImage';
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
  Usp,
  Wrapper,
} from './wrapper';

// One column on phones, two on tablets, three from desktop (at most about 400 px).
const CARD_WIDTHS = [375, 450, 600, 750, 840];
const CARD_SIZES = '(min-width: 1024px) 400px, (min-width: 600px) 50vw, 100vw';

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

  return (
    <Wrapper onClick={onClick}>
      {href && <Link onClick={onHrefClick} href={href} title={title} aria-label={title} />}
      <Image ref={containerRef}>
        {isVisible && image ? (
          <ResponsiveImage
            img={Img}
            src={image}
            widths={CARD_WIDTHS}
            sizes={CARD_SIZES}
            alt={title}
          />
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
