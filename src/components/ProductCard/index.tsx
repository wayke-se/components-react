import React, { useMemo } from 'react';

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
import UspList, { ItemProps } from '../UspList';

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
      <Image>{image && <ImageSrc src={image} alt={title} />}</Image>
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
