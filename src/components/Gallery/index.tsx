import React, { useState, useCallback, useRef } from 'react';
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
import Embed from './embed';

export interface ImageProps {
  gallery: string;
  thumbnail: string;
  lightbox: string;
  type: string;
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
  const slider = useRef<Slider>(null);
  const isDragging = useRef(false);
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const beforeChange = useCallback((oldIndex, newIndex) => setIndex(newIndex), []);

  const onMouseDown = useCallback(() => {
    if (isDragging.current) {
      isDragging.current = false;
    }
  }, []);
  const onMouseMove = useCallback(() => {
    if (!isDragging.current) {
      isDragging.current = true;
    }
  }, []);

  const onClick = useCallback(() => {
    if (!isDragging.current && !lightbox) {
      setLightbox(true);
    }
  }, [lightbox]);

  const nextImage = useCallback((): void => {
    if (!slider || !slider.current) {
      return;
    }
    slider.current.slickNext();
  }, [slider]);

  const prevImage = useCallback((): void => {
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

  const onToggleLightbox = useCallback(() => setLightbox(!lightbox), [lightbox]);

  return (
    <>
      <Wrapper>
        <Proportions>
          <Limiter>
            <Main>
              <SliderWrapper onMouseDown={onMouseDown} onMouseMove={onMouseMove} onClick={onClick}>
                <Slider {...sliderSettings} ref={slider} beforeChange={beforeChange}>
                  {images.map(({ gallery, url, type }: ImageProps, i) => (
                    <Item key={gallery || i}>
                      {type === 'image' && <Image src={gallery} alt={`Bild ${i + 1}`} />}
                      {type === 'embedded' && <Embed src={url} index={i + 1} />}
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
                {images.map(({ thumbnail }: ImageProps, i) => (
                  <QuickNavItem key={thumbnail || i} active={index === i}>
                    <QuickNavBtn onClick={() => goTo(i)} title={`Gå till bild ${i + 1}`}>
                      <QuickNavImg src={`${thumbnail}`} alt={`Bild ${i + 1}`} />
                    </QuickNavBtn>
                  </QuickNavItem>
                ))}
              </QuickNav>
            </Alt>
          </Limiter>
        </Proportions>
      </Wrapper>
      {lightbox && <Lightbox images={images} index={index} onClose={onToggleLightbox} />}
    </>
  );
};

export default Gallery;
