import React, { useState, useCallback, useRef, useMemo } from 'react';
import SliderComponent from 'react-slick';
import scrollIntoView from 'scroll-into-view-if-needed';

const Slider: typeof SliderComponent = (
  SliderComponent as unknown as { default: typeof SliderComponent }
).default;

import {
  Wrapper,
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
import { NavButton } from '../NavButton';
import Lightbox from '../Lightbox';
import EmbededVideo from '../Video/EmbededVideo';
import QuickNavEmbeded from '../Video/QuickNavEmbeded';
import Sphere from '../Sphere/Sphere';
import { notEmpty } from '../../utils/formats';
import ThreeSixty from '../ThreeSixty/ThreeSixty';
import { Branch, Maybe, Media } from '../../@types/codegen/types';
import PubSub from '../../utils/pubsub/pubsub';
import { DEFAULT_PLACEHOLDER_IMAGE } from '../../utils/constants';
import { useTranslation } from 'react-i18next';

interface GalleryProps {
  id: string;
  branch?: Maybe<Branch>;
  media?: Media[];
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

const Gallery = ({ id, branch, media, placeholderImage }: GalleryProps) => {
  const { t } = useTranslation();
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
    PubSub.publish('ImagesClick', {
      id,
      branchId: branch?.id,
      branchName: branch?.name,
    });
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
              {!!media?.length ? (
                media.map((m, i) => (
                  <Item key={m.files[0].url || i}>
                    {m.type === 'image' && (
                      <Image
                        src={
                          m.files[0].formats.filter(notEmpty).find((x) => x.format === '1170x')?.url
                        }
                        alt={t('common.imageIndex', { index: i + 1 }) || ''}
                      />
                    )}
                    {m.type === 'threesixty' && (
                      <ThreeSixty
                        urls={m.files.map((x) => x.url)}
                        visible={i === index}
                        onDisableNavigation={onDisableNavigation}
                        navigationDisabled={navigationDisabled}
                      />
                    )}
                    {m.type === 'embedded' && <EmbededVideo src={m.files[0].url} index={i + 1} />}
                    {m.type === 'sphere' && (
                      <Sphere
                        visible={i === index}
                        url={m.files[0].url}
                        preview={m.files[0].url}
                        onDisableNavigation={onDisableNavigation}
                        navigationDisabled={navigationDisabled}
                      />
                    )}
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
            {!!media?.length ? (
              media.map((m, i) => {
                const src =
                  m.files[0].formats.filter(notEmpty).find((x) => x.format === '225x150')?.url ||
                  m.files[0].url;
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
                          src={m.files[0].url}
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
