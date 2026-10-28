import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Range, Root, Thumb, Track } from '../RangeSlider/wrapper';
import ResponsiveImage from '../ResponsiveImage';
import { Badge, Figure, SliderBar, SliderValue, VisuallyHidden } from './wrapper';

type ImgProps = React.ImgHTMLAttributes<HTMLImageElement>;

interface RotationProps {
  urls: string[];
  /** The styled <img> of the surrounding gallery or lightbox. */
  img: React.ElementType<ImgProps>;
  widths: number[];
  sizes: string;
}

const wrap = (value: number, length: number) => ((value % length) + length) % length;

/**
 * A 360 image: drag, the arrow keys or the slider turn the car, as web-ui-v2's
 * 360 viewer does. The slider spans two turns and starts in the middle, so it
 * can be pulled either way; a drag across the whole image is one turn. Every
 * frame loads at once, so turning never waits for an image.
 */
const Rotation = ({ urls, img, widths, sizes }: RotationProps) => {
  const { t } = useTranslation();
  const count = urls.length;
  const [position, setPosition] = useState(count);
  const frame = position % count;
  const drag = useRef<{ x: number; position: number; width: number } | undefined>(undefined);
  const label = (i: number) => t('item.threeSixty.frame', { frame: i + 1, total: count });

  const onPointerDown = (e: React.PointerEvent<HTMLElement>) => {
    if ((e.target as HTMLElement).closest('[data-rotate-slider]')) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { x: e.clientX, position, width: e.currentTarget.offsetWidth || 1 };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const start = drag.current;
    if (!start) return;
    const delta = Math.round(((e.clientX - start.x) / start.width) * count);
    setPosition(wrap(start.position + delta, count * 2));
  };

  // The release can come at a new position without a move before it.
  const onPointerUp = (e: React.PointerEvent<HTMLElement>) => {
    onPointerMove(e);
    drag.current = undefined;
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    const next: Record<string, number> = {
      ArrowLeft: position - 1,
      ArrowRight: position + 1,
      Home: 0,
      End: count * 2 - 1,
    };
    if (e.key in next) {
      e.preventDefault();
      setPosition(wrap(next[e.key], count * 2));
    }
  };

  return (
    <Figure
      tabIndex={0}
      aria-label={t('item.threeSixty.viewer')}
      aria-roledescription="360"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={() => {
        drag.current = undefined;
      }}
      onKeyDown={onKeyDown}
      onClick={(e) => e.stopPropagation()}
    >
      <VisuallyHidden>{t('item.threeSixty.description')}</VisuallyHidden>
      <VisuallyHidden aria-live="polite">{label(frame)}</VisuallyHidden>
      <Badge aria-hidden>{t('item.threeSixty.badge')}</Badge>
      {urls.map((url, i) => (
        <ResponsiveImage
          key={url}
          img={img}
          src={url}
          widths={widths}
          sizes={sizes}
          alt={label(i)}
          draggable={false}
          style={{ display: i === frame ? 'block' : 'none' }}
        />
      ))}
      <SliderBar data-rotate-slider>
        <Root
          min={0}
          max={count * 2 - 1}
          step={1}
          value={[position]}
          onValueChange={([next]) => setPosition(next)}
        >
          <Track>
            <Range />
          </Track>
          <Thumb aria-label={t('item.threeSixty.rotate')} aria-valuetext={label(frame)} />
        </Root>
        <SliderValue aria-hidden>{label(frame)}</SliderValue>
      </SliderBar>
    </Figure>
  );
};

export default Rotation;
