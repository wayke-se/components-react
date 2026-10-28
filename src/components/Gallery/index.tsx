import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
import ResponsiveImage from '../ResponsiveImage';
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
  Track,
  Wrapper,
} from './wrapper';

// The gallery is at most about 800 px wide, the full width less the thumbnails
// on tablets and 95% of the screen on phones; the browser picks by pixel density.
const GALLERY_WIDTHS = [375, 600, 750, 1000, 1200];
const GALLERY_SIZES = '(min-width: 1200px) 800px, (min-width: 768px) calc(100vw - 180px), 95vw';
const THUMBNAIL_WIDTHS = [96, 128, 225];

interface GalleryProps {
  media: GalleryMedia[];
  placeholderImage?: string;
}

const scrollBehavior = (): ScrollBehavior =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';

/** Scrolls the thumbnail list, and only it, so that the item is visible. */
const revealInList = (list: HTMLElement, item: HTMLElement) => {
  if (item.offsetTop < list.scrollTop) {
    list.scrollTop = item.offsetTop;
  } else if (item.offsetTop + item.offsetHeight > list.scrollTop + list.clientHeight) {
    list.scrollTop = item.offsetTop + item.offsetHeight - list.clientHeight;
  }
};

const Gallery = ({ media, placeholderImage }: GalleryProps) => {
  const { t } = useTranslation();
  const ad = useAdContext();
  const trackRef = useRef<HTMLUListElement>(null);
  const quickNavRef = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  // While a 360 image is turned, swiping would move the gallery instead.
  const [navigationDisabled, setNavigationDisabled] = useState(false);

  const mediaLength = media?.length || 0;
  const placeholder = useMemo(
    () => placeholderImage || DEFAULT_PLACEHOLDER_IMAGE,
    [placeholderImage]
  );

  const goTo = useCallback(
    (target: number) => {
      const track = trackRef.current;
      if (!track || mediaLength === 0) return;
      // The arrows wrap around, from the last slide to the first and back.
      const next = (target + mediaLength) % mediaLength;
      const slide = track.children[next] as HTMLElement | undefined;
      if (slide) track.scrollTo({ left: slide.offsetLeft, behavior: scrollBehavior() });
    },
    [mediaLength]
  );

  // The slide in view decides the index, however the track was scrolled.
  const onScroll = useCallback(() => {
    const track = trackRef.current;
    const first = track?.children[0] as HTMLElement | undefined;
    if (!track || !first?.offsetWidth) return;
    setIndex(Math.min(mediaLength - 1, Math.round(track.scrollLeft / first.offsetWidth)));
  }, [mediaLength]);

  useEffect(() => {
    const list = quickNavRef.current;
    const item = list?.children[index] as HTMLElement | undefined;
    if (list && item) revealInList(list, item);
  }, [index]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLUListElement>) => {
      if (navigationDisabled) return;
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        goTo(index + (e.key === 'ArrowLeft' ? -1 : 1));
      }
    },
    [goTo, index, navigationDisabled]
  );

  const onClick = useCallback(() => {
    PubSub.publish('ImagesClick', adEvent(ad));
    if (!navigationDisabled && mediaLength) setLightbox(true);
  }, [ad, navigationDisabled, mediaLength]);

  const onEnableNavigation = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setNavigationDisabled(false);
  };

  const onToggleLightbox = useCallback(() => setLightbox(!lightbox), [lightbox]);

  return (
    <>
      <Wrapper>
        <Main>
          <Track
            ref={trackRef}
            $locked={navigationDisabled}
            onScroll={onScroll}
            onKeyDown={onKeyDown}
            onClick={onClick}
            tabIndex={0}
            aria-label={t('other.gallery')}
          >
            {mediaLength ? (
              media.map((m, i) => (
                <Item
                  key={m.urls[0] || i}
                  aria-label={t('common.imageIndex', { index: i + 1 })}
                  aria-current={i === index || undefined}
                >
                  {m.type === 'image' && (
                    <ResponsiveImage
                      img={Image}
                      src={m.urls[0]}
                      widths={GALLERY_WIDTHS}
                      sizes={GALLERY_SIZES}
                      alt={t('common.imageIndex', { index: i + 1 }) || ''}
                      // The first image is in view at once; the rest load as they come near.
                      loading={i === 0 ? 'eager' : 'lazy'}
                      draggable={false}
                    />
                  )}
                  {m.type === 'threesixty' && (
                    <ThreeSixty
                      urls={m.urls}
                      visible={i === index}
                      onDisableNavigation={() => setNavigationDisabled(true)}
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
          </Track>
          {navigationDisabled && mediaLength > 1 && (
            <EnableNavigationButton>
              <ButtonSecondary onClick={onEnableNavigation} title={t('common.close') || ''}>
                <ButtonContent>{t('common.close')}</ButtonContent>
              </ButtonSecondary>
            </EnableNavigationButton>
          )}
          {!navigationDisabled && mediaLength > 1 && (
            <>
              <ArrowLeft>
                <NavButton onClick={() => goTo(index - 1)} title={t('other.previousImage') || ''}>
                  <IconChevronLeft block />
                </NavButton>
              </ArrowLeft>
              <ArrowRight>
                <NavButton onClick={() => goTo(index + 1)} title={t('other.nextImage') || ''}>
                  <IconChevronRight block />
                </NavButton>
              </ArrowRight>
            </>
          )}
        </Main>
        <Alt>
          <QuickNav ref={quickNavRef}>
            {mediaLength ? (
              media.map((m, i) => {
                const src =
                  m.type === 'embedded'
                    ? m.urls[0]
                    : imageUrl(m.urls[0], { width: 225, height: 150 });
                return (
                  <QuickNavItem key={src || i} $active={index === i}>
                    <QuickNavBtn
                      onClick={() => goTo(i)}
                      title={t('other.goToImageIndex', { index: i + 1 }) || ''}
                      aria-current={index === i || undefined}
                    >
                      {m.type === 'embedded' ? (
                        <QuickNavEmbeded src={src} index={i} />
                      ) : (
                        <ResponsiveImage
                          img={QuickNavImg}
                          src={m.urls[0]}
                          widths={THUMBNAIL_WIDTHS}
                          sizes="75px"
                          alt={t('common.imageIndex', { index: i + 1 }) || ''}
                          loading="lazy"
                        />
                      )}
                    </QuickNavBtn>
                  </QuickNavItem>
                );
              })
            ) : (
              <QuickNavItem key={placeholder} $active>
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
      {lightbox && !!mediaLength && (
        <Lightbox media={media} index={index} onClose={onToggleLightbox} />
      )}
    </>
  );
};

export default Gallery;
