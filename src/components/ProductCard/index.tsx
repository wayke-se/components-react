import React, { useMemo } from 'react';
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

interface Props {
  id: string;
  title: string;
  href?: string;
  image?: string;
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
  placeholderImage,
  description,
  uspList,
  price,
  oldPrice,
  onClick,
}: Props) => {
  const _onClick = useMemo(() => (onClick ? () => onClick(id) : undefined), [id]);
  return (
    <Wrapper onClick={_onClick}>
      <Image>
        <LazyLoad>
          {image ? (
            <Picture>
              <Source media="(min-width: 900px)" srcSet={`${image}?w=411&q=72`} />
              <Source media="(min-width: 600px)" srcSet={`${image}?w=418&q=72`} />
              <Img src={`${image}?w=567&q=72`} alt={title} />
            </Picture>
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
              <Link href={href} title={title} aria-label={title}>
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
