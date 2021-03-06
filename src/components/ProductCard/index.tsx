import React, { useCallback, useMemo } from 'react';
import LazyLoad from 'react-lazyload';

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
} from './wrapper';
import UspList, { ItemProps } from '../UspList/index';
import { DEFAULT_PLACEHOLDER_IMAGE } from '../../utils/constants';
import usePath from '../../State/Path/usePath';

interface Props {
  id: string;
  title: string;
  href?: string;
  image?: string;
  pathRoute?: string;
  placeholderImage?: string;
  description?: string;
  uspList?: ItemProps[];
  price: string;
  oldPrice?: string;
  onClick?: (id: string) => void;
}

const ProductCard = ({
  id,
  title,
  href,
  image,
  pathRoute,
  placeholderImage,
  description,
  uspList,
  price,
  oldPrice,
  onClick,
}: Props) => {
  const { pushState } = usePath();
  const _onClick = useMemo(() => (onClick ? () => onClick(id) : undefined), [id]);

  const onHrefClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      if (!!pathRoute && href) {
        e.preventDefault();
        pushState(href);
      }
    },
    [id, pathRoute, href]
  );

  return (
    <Wrapper onClick={_onClick}>
      <Image>
        <LazyLoad>
          {image ? (
            <>
              <Picture>
                <Source
                  type="image/webp"
                  srcSet={`${image}?spec=822x548&format=webp 822w, ${image}?spec=750x500&format=webp 750w, ${image}?spec=411x274&format=webp 411w`}
                  sizes="(min-width: 600px) calc(((100vw - 48px) / 2) - 8px), (min-width: 900px) calc(((100vw - 48px) / 3) - 10.666px), (min-width: 1312px) 410px, calc(100vw - 32px)"
                />
                <Img
                  srcSet={`${image}?spec=822x548 822w, ${image}?spec=750x500 750w, ${image}?spec=411x274 411w`}
                  sizes="(min-width: 600px) calc(((100vw - 48px) / 2) - 8px), (min-width: 900px) calc(((100vw - 48px) / 3) - 10.666px), (min-width: 1312px) 410px, calc(100vw - 32px)"
                  src={`${image}?spec=411x274`}
                  alt={title}
                />
              </Picture>
            </>
          ) : (
            <Picture>
              <Img src={placeholderImage || DEFAULT_PLACEHOLDER_IMAGE} />
            </Picture>
          )}
        </LazyLoad>
      </Image>
      <Content>
        <ContentBody>
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
            <CurrentPrice>{price}</CurrentPrice>
            {oldPrice && <OldPrice>{oldPrice}</OldPrice>}
          </Price>
        </ContentFooter>
      </Content>
    </Wrapper>
  );
};

export default ProductCard;
