import React from 'react';

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
  title: string;
  href: string;
  image?: string;
  description?: string;
  uspList?: ItemProps[];
  price: string;
  oldPrice?: string;
}

const ProductCard = ({ title, href, image, description, uspList, price, oldPrice }: Props) => (
  <Wrapper>
    <Image>{image && <ImageSrc src={image} alt={title} />}</Image>
    <Content>
      <ContentBody>
        <Heading>
          <Link href={href} title={title} aria-label={title}>
            {title}
          </Link>
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

export default ProductCard;
