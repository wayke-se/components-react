import React from 'react';

import {
  Wrapper,
  Image,
  ImageaPlaceholder,
  Body,
  Heading,
  Title,
  Branding,
  Price,
  Preamble,
  ReadMoreBtn,
} from './wrapper';
import { IconImage } from '../Icon/index';
import { useTranslation } from 'react-i18next';

interface AccessoryCardImageProps {
  src: string;
  srcSet?: string;
  alt: string;
}

interface AccessoryCardProps {
  title: string;
  image?: AccessoryCardImageProps;
  branding?: AccessoryCardImageProps;
  price?: string;
  preamble?: string;
  readMoreCta?: () => void;
}

const AccessoryCard = ({
  title,
  image,
  branding,
  price,
  preamble,
  readMoreCta,
}: AccessoryCardProps) => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      {image ? (
        <Image src={image.src} srcSet={image.srcSet} alt={image.alt} />
      ) : (
        <ImageaPlaceholder>
          <IconImage />
        </ImageaPlaceholder>
      )}
      <Body>
        <Heading>
          <Title>{title}</Title>
          {branding && <Branding src={branding.src} srcSet={branding.srcSet} alt={branding.alt} />}
        </Heading>
        {price && <Price>{price}</Price>}
        {preamble && <Preamble>{preamble}</Preamble>}
        {readMoreCta && (
          <ReadMoreBtn onClick={readMoreCta} title={t('common.readMore') || ''}>
            {t('common.readMore')}
          </ReadMoreBtn>
        )}
      </Body>
    </Wrapper>
  );
};

export default AccessoryCard;
