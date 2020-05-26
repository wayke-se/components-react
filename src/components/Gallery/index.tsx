import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import { Wrapper, SliderWrapper, Item, Image, ArrowLeft, ArrowRight } from './wrapper';
import { IconChevronLeft, IconChevronRight } from '../Icon';

interface ImageProps {
  url: string;
}

interface GalleryProps {
  images: ImageProps[];
}

const sliderSettings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 300,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const Gallery = ({ images }: GalleryProps) => {
  const slider = React.useRef<Slider>(null);

  const nextImage = React.useCallback((): void => {
    if (!slider || !slider.current) {
      return;
    }
    slider.current.slickNext();
  }, [slider]);

  const prevImage = React.useCallback((): void => {
    if (!slider || !slider.current) {
      return;
    }
    slider.current.slickPrev();
  }, [slider]);

  return (
    <Wrapper>
      <SliderWrapper>
        <Slider {...sliderSettings} ref={slider}>
          {images.map(({ url }: ImageProps, i) => (
            <Item key={url}>
              <Image src={`${url}`} alt={`Bild ${i + 1}`} />
            </Item>
          ))}
        </Slider>
      </SliderWrapper>

      <ArrowLeft onClick={prevImage} title="Föregående bild">
        <IconChevronLeft block />
      </ArrowLeft>
      <ArrowRight onClick={nextImage} title="Nästa bild">
        <IconChevronRight block />
      </ArrowRight>
    </Wrapper>
  );
};

export default Gallery;
