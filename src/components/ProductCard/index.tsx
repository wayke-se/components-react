import React, { useMemo } from 'react';
import LazyLoad from 'react-lazyload';

import {
  Wrapper,
  Image,
  ImageSrc,
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

interface Props {
  id: string;
  title: string;
  href?: string;
  image?: string;
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
          {image && (
            <picture>
              <source media="(min-width: 900px)" srcSet={`${image}?w=411&q=72`} />
              <source media="(min-width: 600px)" srcSet={`${image}?w=410&q=72`} />
              <ImageSrc src={`${image}?w=552&q=72`} alt={title} />
            </picture>
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
