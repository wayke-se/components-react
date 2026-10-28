// Widths accepted by the cfit/v3 image worker (image-transform-v3); any other
// value makes it respond 400, and it reads only the first occurrence of each
// query param. Legacy media URLs instead take a free-form ?spec=WxH.
const CFIT_WIDTHS = [
  48, 64, 96, 128, 225, 375, 380, 450, 600, 750, 770, 800, 840, 900, 1170, 1200, 2000, 4096, 8192,
];

const isCfit = (src: string) => src.includes('/cfit/');

const snapCfitWidth = (width: number) =>
  CFIT_WIDTHS.find((w) => w >= width) || CFIT_WIDTHS[CFIT_WIDTHS.length - 1];

export type ImageSpec = [width: number, height: number];

interface ImageOptions {
  width: number;
  height: number;
  webp?: boolean;
}

export const imageUrl = (src: string, { width, height, webp }: ImageOptions) => {
  if (isCfit(src)) {
    const [base, query] = src.split('?');
    const params = new URLSearchParams(query);
    params.set('w', String(snapCfitWidth(width)));
    if (webp) {
      params.set('format', 'webp');
    }
    return `${base}?${params.toString()}`;
  }
  return `${src}?spec=${width}x${height}${webp ? '&format=webp' : ''}`;
};

/**
 * Width-limited URL for an image that may come from cfit (allowed widths only)
 * or from a host that takes a free ?w=&h= (legacy media, blob storage).
 */
export const imageWithWidth = (src: string, width: number, height?: number) => {
  if (isCfit(src)) return imageUrl(src, { width, height: height || width });
  return `${src}?w=${width}${height ? `&h=${height}` : ''}`;
};

export const imageSrcSet = (src: string, specs: ImageSpec[], webp?: boolean) =>
  specs
    .map(([width, height]) => {
      const descriptor = isCfit(src) ? snapCfitWidth(width) : width;
      return `${imageUrl(src, { width, height, webp })} ${descriptor}w`;
    })
    .join(', ');
