import React, { useCallback, useMemo } from 'react';

import {
  Wrapper,
  Image,
  Picture,
  Source,
  Img,
  Content,
  ContentBody,
  ContentFooter,
  Heading,
  Link,
  Description,
  Usp,
  Price,
  CurrentPrice,
  OldPrice,
  PriceCell,
  Label,
  PreHeading,
} from './wrapper';
import UspList, { ItemProps } from '../UspList';
import { DEFAULT_PLACEHOLDER_IMAGE } from '../../utils/constants';
import usePath from '../../State/Path/usePath';
import { useTranslation } from 'react-i18next';
import useIsInViewport from '../../hooks/useIsInViewport';
import { File } from '../../@types/search';

interface Props {
  id: string;
  title: string;
  href?: string;
  imageFile?: File;
  pathRoute?: string;
  placeholderImage?: string;
  description?: string;
  uspList?: ItemProps[];
  price: string;
  leasingPrice?: string;
  oldPrice?: string;
  branchName?: string;
  businessLeasingPrice?: string;
  onClick?: (id: string) => void;
}

const ProductCard = ({
  id,
  title,
  href,
  imageFile,
  pathRoute,
  placeholderImage,
  branchName,
  description,
  uspList,
  price,
  oldPrice,
  leasingPrice,
  businessLeasingPrice,
  onClick,
}: Props) => {
  const { t } = useTranslation();

  const [containerRef, isVisible] = useIsInViewport<HTMLDivElement>({
    persistVisibility: true,
  });

  const { pushState } = usePath();
  const _onClick = useMemo(() => (onClick ? () => onClick(id) : undefined), [id]);

  const onHrefClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      if (pathRoute && href) {
        const reg = new RegExp('^((http|https)://)|//');
        if (!pathRoute.match(reg) && !pathRoute.startsWith(location.origin)) {
          e.preventDefault();
          pushState(href);
        }
      }
    },
    [id, pathRoute, href]
  );

  const { webp, url } = useMemo(() => {
    const format = imageFile?.formats.find((x) => x.format === '770x514');
    if (format) {
      return {
        webp: format.webp,
        url: format.url,
      };
    }

    return {
      url: imageFile?.url,
    };
  }, [imageFile]);

  return (
    <Wrapper onClick={_onClick}>
      <Image ref={containerRef}>
        {isVisible && url ? (
          <>
            <Picture>
              {webp && <Source type="image/webp" srcSet={webp} />}
              <Img alt={title} src={url} />
              {/*
                <>
                  <Source
                    type="image/webp"
                    srcSet={`${image}?spec=822x548&format=webp 822w, ${image}?spec=750x500&format=webp 750w, ${image}?spec=411 411w`}
                    sizes="(min-width: 600px) calc(((100vw - 48px) / 2) - 8px), (min-width: 900px) calc(((100vw - 48px) / 3) - 10.666px), (min-width: 1312px) 410px, calc(100vw - 32px)"
                  />
                  <Img
                    srcSet={`${image}?spec=822x548 822w, ${image}?spec=750x500 750w, ${image}?spec=411x274 411w`}
                    sizes="(min-width: 600px) calc(((100vw - 48px) / 2) - 8px), (min-width: 900px) calc(((100vw - 48px) / 3) - 10.666px), (min-width: 1312px) 410px, calc(100vw - 32px)"
                    src={`${image}?spec=411x274`}
                    alt={title}
                  />
                </>
        )*/}
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
          <Heading>
            {href ? (
              <Link onClick={onHrefClick} href={href} title={title} aria-label={title}>
                {title}
              </Link>
            ) : (
              title
            )}
          </Heading>
          {description && <Description>{description}</Description>}
          {uspList && (
            <Usp>
              <UspList small items={uspList} />
            </Usp>
          )}
        </ContentBody>
        <ContentFooter>
          <Price>
            <PriceCell>
              {oldPrice ? <OldPrice>{oldPrice}</OldPrice> : <Label>{t('productCard.price')}</Label>}
              <CurrentPrice>{price}</CurrentPrice>
            </PriceCell>
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
