import React from 'react';
import { cfitSources, imageUrl, isCfit } from '../../utils/image';

type ImgProps = React.ImgHTMLAttributes<HTMLImageElement>;

interface ResponsiveImageProps extends Omit<ImgProps, 'src' | 'srcSet' | 'sizes'> {
  src: string;
  /** Widths to offer; each is snapped to one the image service accepts. */
  widths: number[];
  /** How wide the image is shown, as for <img sizes>. */
  sizes: string;
  /** The styled <img> to render. */
  img?: React.ElementType<ImgProps>;
}

/**
 * An ad image in the size and format the browser needs (AVIF, WebP, else JPEG),
 * decoded off the main thread. Images from other hosts get the largest width.
 */
const ResponsiveImage = ({
  src,
  widths,
  sizes,
  img: Img = 'img',
  ...rest
}: ResponsiveImageProps) => {
  const largest = Math.max(...widths);
  if (!isCfit(src)) {
    return (
      <Img src={imageUrl(src, { width: largest, height: Math.round(largest / 1.5) })} {...rest} />
    );
  }
  const sources = cfitSources(src, widths);
  return (
    <picture style={{ display: 'contents' }}>
      <source type="image/avif" srcSet={sources.avif} sizes={sizes} />
      <source type="image/webp" srcSet={sources.webp} sizes={sizes} />
      <Img
        src={imageUrl(src, { width: largest, height: Math.round(largest / 1.5) })}
        srcSet={sources.jpeg}
        sizes={sizes}
        decoding="async"
        {...rest}
      />
    </picture>
  );
};

export default ResponsiveImage;
