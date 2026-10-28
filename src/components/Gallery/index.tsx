import React, { useCallback, useMemo, useRef, useState } from 'react';
import SliderComponent from 'react-slick';
import scrollIntoView from 'scroll-into-view-if-needed';

const Slider: typeof SliderComponent = (
  SliderComponent as unknown as { default: typeof SliderComponent }
).default;

import { useTranslation } from 'react-i18next';
import { adEvent, GalleryMedia } from '../../Gql/ad/view';
import useAdContext from '../../State/Ad/AdContext';
import { DEFAULT_PLACEHOLDER_IMAGE } from '../../utils/constants';
import { imageUrl } from '../../utils/image';
import PubSub from '../../utils/pubsub/pubsub';
import { ButtonContent, ButtonSecondary } from '../Button';
import { IconChevronLeft, IconChevronRight } from '../Icon';
import Lightbox from '../Lightbox';
import { NavButton } from '../NavButton';
import Sphere from '../Sphere/Sphere';
import ThreeSixty from '../ThreeSixty/ThreeSixty';
import EmbededVideo from '../Video/EmbededVideo';
import QuickNavEmbeded from '../Video/QuickNavEmbeded';
import {
  Alt,
  ArrowLeft,
  ArrowRight,
  EnableNavigationButton,
  Image,
  Item,
  Main,
  QuickNav,
  QuickNavBtn,
  QuickNavImg,
  QuickNavItem,
  SliderWrapper,
  Wrapper,
} from './wrapper';

interface GalleryProps {
  media: GalleryMedia[];
  placeholderImage?: string;
}

const sliderSettings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 300,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const Gallery = ({ media, placeholderImage }: GalleryProps) => {
  const { t } = useTranslation();
  const ad = useAdContext();
  const slider = useRef<SliderComponent>(null);
  const quickNavRef = useRef<HTMLUListElement>(null);
  const isDragging = useRef(false);
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [navigationDisabled, setNavigationDisabled] = useState(false);

  const beforeChange = useCallback((_: number, newIndex: number) => {
    const element = quickNavRef.current?.querySelectorAll('li')?.[newIndex];
    if (element) {
      scrollIntoView(element, { scrollMode: 'if-needed', block: 'nearest', inline: 'nearest' });
    }
    setIndex(newIndex);
  }, []);

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
    PubSub.publish('ImagesClick', adEvent(ad));
    if (!isDragging.current && !lightbox && !!media?.length) {
      setLightbox(true);
    }
  }, [lightbox, media]);

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

  const mediaLength = media?.length || 0;
  const placeholder = useMemo(
    () => placeholderImage || DEFAULT_PLACEHOLDER_IMAGE,
    [placeholderImage]
  );

  return (
    <>
      <Wrapper>
        <Main>
          <SliderWrapper onMouseDown={onMouseDown} onMouseMove={onMouseMove} onClick={onClick}>
            <Slider
              {...sliderSettings}
              swipe={!navigationDisabled}
              touchMove={!navigationDisabled}
              swipeToSlide={!navigationDisabled}
              ref={slider}
              beforeChange={beforeChange}
            >
              {media?.length ? (
                media.map((m, i) => (
                  <Item key={m.urls[0] || i}>
                    {m.type === 'image' && (
                      <Image
                        src={imageUrl(m.urls[0], { width: 1170, height: 780 })}
                        alt={t('common.imageIndex', { index: i + 1 }) || ''}
                      />
                    )}
                    {m.type === 'threesixty' && (
                      <ThreeSixty
                        urls={m.urls}
                        visible={i === index}
                        onDisableNavigation={onDisableNavigation}
                        navigationDisabled={navigationDisabled}
                      />
                    )}
                    {m.type === 'embedded' && <EmbededVideo src={m.urls[0]} index={i + 1} />}
                    {m.type === 'sphere' && <Sphere url={m.urls[0]} />}
                  </Item>
                ))
              ) : (
                <Item key={placeholder}>
                  <Image src={placeholder} alt={t('common.imageIndex', { index: 1 }) || ''} />
                </Item>
              )}
            </Slider>
            {navigationDisabled && mediaLength > 1 && (
              <EnableNavigationButton>
                <ButtonSecondary onClick={onEnableNavigation} title={t('common.close') || ''}>
                  <ButtonContent>{t('common.close')}</ButtonContent>
                </ButtonSecondary>
              </EnableNavigationButton>
            )}
          </SliderWrapper>
          {!navigationDisabled && mediaLength > 1 && (
            <>
              <ArrowLeft>
                <NavButton onClick={prevImage} title={t('other.previousImage') || ''}>
                  <IconChevronLeft block />
                </NavButton>
              </ArrowLeft>
              <ArrowRight>
                <NavButton onClick={nextImage} title={t('other.nextImage') || ''}>
                  <IconChevronRight block />
                </NavButton>
              </ArrowRight>
            </>
          )}
        </Main>
        <Alt>
          <QuickNav ref={quickNavRef}>
            {media?.length ? (
              media.map((m, i) => {
                const src =
                  m.type === 'embedded'
                    ? m.urls[0]
                    : imageUrl(m.urls[0], { width: 225, height: 150 });
                return (
                  <QuickNavItem key={src || i} active={index === i}>
                    <QuickNavBtn
                      onClick={() => goTo(i)}
                      title={t('other.goToImageIndex', { index: i + 1 }) || ''}
                    >
                      {m.type === 'image' && (
                        <QuickNavImg
                          src={src}
                          alt={t('common.imageIndex', { index: i + 1 }) || ''}
                        />
                      )}
                      {m.type === 'threesixty' && (
                        <QuickNavImg
                          src={src}
                          alt={t('common.imageIndex', { index: i + 1 }) || ''}
                        />
                      )}
                      {m.type === 'embedded' && <QuickNavEmbeded src={src} index={i} />}
                      {m.type === 'sphere' && (
                        <QuickNavImg
                          src={src}
                          alt={t('common.imageIndex', { index: i + 1 }) || ''}
                        />
                      )}
                    </QuickNavBtn>
                  </QuickNavItem>
                );
              })
            ) : (
              <QuickNavItem key={placeholder} active>
                <QuickNavBtn
                  onClick={() => goTo(0)}
                  title={t('other.goToImageIndex', { index: 1 }) || ''}
                >
                  <QuickNavImg src={placeholder} alt={t('common.imageIndex', { index: 1 }) || ''} />
                </QuickNavBtn>
              </QuickNavItem>
            )}
          </QuickNav>
        </Alt>
      </Wrapper>
      {lightbox && !!media?.length && (
        <Lightbox media={media} index={index} onClose={onToggleLightbox} />
      )}
    </>
  );
};

export default Gallery;
