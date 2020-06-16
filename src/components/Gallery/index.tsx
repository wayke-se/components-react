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
  EnableNavigationButton,
} from './wrapper';
import { IconChevronLeft, IconChevronRight } from '../Icon';
import { ButtonSecondary, ButtonContent } from '../Button';
import Lightbox from '../Lightbox';
import GalleryEmbed from '../Video/GalleryEmbed';
import QuickNavEmbed from './QuickNavEmbed';
import SpherePreview from '../Sphere/SpherePreview';
import { SearchItem_vehicle_media } from '../../@types/gql/SearchItem';
import { notEmpty } from '../../utils/formats';

interface GalleryProps {
  media: SearchItem_vehicle_media[];
}

const sliderSettings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 300,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const Gallery = ({ media }: GalleryProps) => {
  const slider = useRef<Slider>(null);
  const isDragging = useRef(false);
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [navigationDisabled, setNavigationDisabled] = useState(false);

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

  const onDisableNavigation = () => {
    if (!isDragging.current) setNavigationDisabled(true);
  };
  const onEnableNavigation = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    isDragging.current = false;
    setNavigationDisabled(false);
  };

  const onToggleLightbox = useCallback(() => setLightbox(!lightbox), [lightbox]);

  return (
    <>
      <Wrapper>
        <Proportions>
          <Limiter>
            <Main>
              <SliderWrapper onMouseDown={onMouseDown} onMouseMove={onMouseMove} onClick={onClick}>
                <Slider
                  {...sliderSettings}
                  swipe={!navigationDisabled}
                  touchMove={!navigationDisabled}
                  swipeToSlide={!navigationDisabled}
                  arrows={!navigationDisabled}
                  ref={slider}
                  beforeChange={beforeChange}
                >
                  {media.map((m, i) => (
                    <Item key={m.files[0].url || i}>
                      {m.type === 'image' && (
                        <Image
                          src={
                            m.files[0].formats.filter(notEmpty).find((x) => x.format === '1170x')
                              ?.url
                          }
                          alt={`Bild ${i + 1}`}
                        />
                      )}
                      {m.type === 'embedded' && <GalleryEmbed src={m.files[0].url} index={i + 1} />}
                      {m.type === 'sphere' && (
                        <SpherePreview
                          visible={i === index}
                          url={m.files[0].url}
                          preview={m.files[0].url}
                          onDisableNavigation={onDisableNavigation}
                          navigationDisabled={navigationDisabled}
                        />
                      )}
                    </Item>
                  ))}
                </Slider>
                {navigationDisabled && (
                  <EnableNavigationButton>
                    <ButtonSecondary onClick={onEnableNavigation} title="Stäng">
                      <ButtonContent>Stäng</ButtonContent>
                    </ButtonSecondary>
                  </EnableNavigationButton>
                )}
              </SliderWrapper>
              {!navigationDisabled && (
                <>
                  <ArrowLeft onClick={prevImage} title="Föregående bild">
                    <IconChevronLeft block />
                  </ArrowLeft>
                  <ArrowRight onClick={nextImage} title="Nästa bild">
                    <IconChevronRight block />
                  </ArrowRight>
                </>
              )}
            </Main>
            <Alt>
              <QuickNav>
                {media.map((m, i) => (
                  <QuickNavItem
                    key={
                      m.files[0].formats.filter(notEmpty).find((x) => x.format === '225x150')
                        ?.url || i
                    }
                    active={index === i}
                  >
                    <QuickNavBtn onClick={() => goTo(i)} title={`Gå till bild ${i + 1}`}>
                      {m.type === 'image' && (
                        <QuickNavImg
                          src={
                            m.files[0].formats.filter(notEmpty).find((x) => x.format === '225x150')
                              ?.url
                          }
                          alt={`Bild ${i + 1}`}
                        />
                      )}
                      {m.type === 'embedded' && <QuickNavEmbed src={m.files[0].url} index={i} />}
                      {m.type === 'sphere' && (
                        <QuickNavImg src={m.files[0].url} alt={`Bild ${i + 1}`} />
                      )}
                    </QuickNavBtn>
                  </QuickNavItem>
                ))}
              </QuickNav>
            </Alt>
          </Limiter>
        </Proportions>
      </Wrapper>
      {lightbox && <Lightbox media={media} index={index} onClose={onToggleLightbox} />}
    </>
  );
};

export default Gallery;
