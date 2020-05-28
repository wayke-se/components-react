import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import {
  Wrapper,
  Proportions,
  Limiter,
  SliderWrapper,
  Item,
  Image,
  ArrowLeft,
  ArrowRight,
  Main,
  Alt,
  QuickNav,
  QuickNavItem,
  QuickNavBtn,
  QuickNavImg,
} from './wrapper';
import { IconChevronLeft, IconChevronRight } from '../Icon';
import Lightbox from '../Lightbox';

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
  const [index, setIndex] = React.useState(0);
  const [lightbox, setLightbox] = React.useState(false);

  const beforeChange = React.useCallback((oldIndex, newIndex) => setIndex(newIndex), []);

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

  const goTo = (target: number) => {
    if (!slider || !slider.current) {
      return;
    }
    if (slider.current) {
      setIndex(target);
      slider.current.slickGoTo(target);
    }
  };

  const onToggleLightbox = React.useCallback(() => setLightbox(!lightbox), [lightbox]);

  return (
    <>
      <Wrapper>
        <Proportions>
          <Limiter>
            <Main>
              <SliderWrapper>
                <Slider {...sliderSettings} ref={slider} beforeChange={beforeChange}>
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
            </Main>
            <Alt>
              <QuickNav>
                {images.map(({ url }: ImageProps, i) => (
                  <QuickNavItem key={url} active={index === i}>
                    <QuickNavBtn onClick={() => goTo(i)} title={`Gå till bild ${i + 1}`}>
                      <QuickNavImg src={`${url}`} alt={`Bild ${i + 1}`} />
                    </QuickNavBtn>
                  </QuickNavItem>
                ))}
              </QuickNav>
            </Alt>
          </Limiter>
        </Proportions>
      </Wrapper>
      {lightbox && <Lightbox images={images} onClose={onToggleLightbox} />}
      <button onClick={onToggleLightbox}>Toggle Lightbox</button>
    </>
  );
};

export default Gallery;
