// Widths accepted by the cfit/v3 image worker (SUPPORTED_WIDTHS in image-transform-v3);
// any other value makes it respond 400, and it reads only the first occurrence of
// each query param.
const CFIT_WIDTHS = [
  48, 64, 96, 128, 225, 375, 380, 450, 600, 680, 750, 770, 800, 840, 900, 1000, 1080, 1170, 1200,
  1920, 2000, 4096, 8192,
];

export const isCfit = (src: string) => src.includes('/cfit/');

const snapCfitWidth = (width: number) =>
  CFIT_WIDTHS.find((w) => w >= width) || CFIT_WIDTHS[CFIT_WIDTHS.length - 1];

// Wayke media hosts, and the CDN host whose /cfit/v3 serves the same blob.
const CDN_FOR_MEDIA_HOST: Record<string, string> = {
  'cdn.wayke.se': 'cdn.wayke.se',
  'cdn.drive.no': 'cdn.drive.no',
  'test-cdn.wayke.se': 'test-cdn.wayke.se',
  'test-cdn.drive.no': 'test-cdn.drive.no',
  'test-cdn.wayketech.se': 'test-cdn.wayketech.se',
  'waykeprodsharedstorages.blob.core.windows.net': 'cdn.wayke.se',
  'wayketestsharedstorages.blob.core.windows.net': 'test-cdn.wayketech.se',
};

const WAYKE_MEDIA = /^(?:https?:)?\/\/([^/?#]+)\/(media|cfit)\/([^?#]+)(?:\?([^#]*))?/i;
const MEDIA_ID_PATH = /^[0-9a-f]{32}\/[0-9a-f]{32}$/i;

interface WaykeMedia {
  /** The image on cfit/v3 (image-transform-v3), without a query. */
  base: string;
  /** The query to keep: a cfit URL's own (r, overlay…); none for /media. */
  keep: URLSearchParams;
  /** The width a /media URL asked the legacy resizer for (`w`, or `spec=WxH`). */
  legacyWidth?: number;
  /**
   * Whether the legacy resizer would have enlarged a small image to the width asked
   * for. It did on the CDN hosts; blob storage ignored every query and returned the
   * original, which cfit/v3 reproduces with fit=scale-down (never enlarges).
   */
  enlarges: boolean;
}

/**
 * A Wayke image as cfit/v3: `<cdn>/media/<path>` (the legacy resizer with a query,
 * otherwise the original), `<blob>/media/<path>` (always the original) or the older
 * `<cdn>/cfit/<id>/<id>` (same bytes, but no widths above 1200). Neither of the first
 * two is ever requested any more: the legacy resizer (image-transform-legacy) is being
 * retired and blob storage serves the full original. Anything else is undefined.
 */
const waykeMedia = (src?: string | null): WaykeMedia | undefined => {
  const match = src?.match(WAYKE_MEDIA);
  const host = match?.[1].toLowerCase();
  const cdn = host && CDN_FOR_MEDIA_HOST[host];
  if (!match || !cdn) return undefined;
  const [, , kind, rawPath, query] = match;
  if (kind.toLowerCase() === 'cfit') {
    const path = rawPath.replace(/^v3\//, '');
    if (!MEDIA_ID_PATH.test(path)) return undefined;
    return {
      base: `https://${cdn}/cfit/v3/${path}`,
      keep: new URLSearchParams(query),
      enlarges: true,
    };
  }
  const enlarges = !host.endsWith('.blob.core.windows.net');
  const params = new URLSearchParams(query);
  const legacyWidth =
    Number(params.get('spec')?.match(/^(\d+)/)?.[1] ?? params.get('w')) || undefined;
  return {
    base: `https://${cdn}/cfit/v3/${rawPath.replace(/\/$/, '')}`,
    keep: new URLSearchParams(),
    // Blob storage ignored the query: the original is what was shown.
    legacyWidth: enlarges ? legacyWidth : undefined,
    enlarges,
  };
};

const cfitUrl = (media: WaykeMedia, set: Record<string, string | undefined>) => {
  const params = new URLSearchParams(media.keep);
  for (const [key, value] of Object.entries(set)) {
    if (value !== undefined) params.set(key, value);
  }
  const query = params.toString();
  return query ? `${media.base}?${query}` : media.base;
};

export type ImageSpec = [width: number, height: number];

interface ImageOptions {
  width: number;
  /** Only for other hosts' `?spec=`: on cfit/v3 the box crops (object-fit: cover). */
  height: number;
  webp?: boolean;
}

export const imageUrl = (src: string, { width, height, webp }: ImageOptions) => {
  const media = waykeMedia(src);
  if (media) {
    return cfitUrl(media, { w: String(snapCfitWidth(width)), format: webp ? 'webp' : undefined });
  }
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
 * Width-limited URL. A Wayke image goes through cfit/v3 at the next width it serves
 * (rounded up, no height: the boxes these fill crop with object-fit: cover); any other
 * host gets the free ?w=&h= it had.
 */
export const imageWithWidth = (src: string, width: number, height?: number) => {
  if (waykeMedia(src) || isCfit(src)) return imageUrl(src, { width, height: height || width });
  return `${src}?w=${width}${height ? `&h=${height}` : ''}`;
};

/**
 * A Wayke image as it was shown before, now through cfit/v3: the original's size
 * (no width; a `/media` URL with a legacy width keeps that resize), or `width` when
 * given. Logos (`png`) come back as PNG: the legacy resizer and blob kept the source
 * format, and format=png does the same (a JPEG stays JPEG), where v3's default
 * webp/jpeg would put a transparent logo on white wherever webp is missing.
 * Any other URL is returned as is.
 */
export const waykeImage = <T extends string | null | undefined>(
  src: T,
  { width, png }: { width?: number; png?: boolean } = {}
): T | string => {
  const media = waykeMedia(src);
  if (!media) return src;
  const resizeTo = width ?? media.legacyWidth;
  return cfitUrl(media, {
    w: resizeTo ? String(snapCfitWidth(resizeTo)) : undefined,
    fit: resizeTo && !media.enlarges ? 'scale-down' : undefined,
    format: png ? 'png' : undefined,
  });
};

/**
 * Width-limited URL for a logo: on cfit/v3 as PNG, enlarged where the legacy resizer
 * enlarged (CDN hosts) and never where blob storage returned the original. Same box:
 * the logo boxes cap width and height, and the width only grows.
 */
export const logoWithWidth = (src: string, width: number) =>
  waykeMedia(src) ? waykeImage(src, { width, png: true }) : `${src}?w=${width}`;

/**
 * A logo URL handed over with a legacy resize already in it (cms-service passes
 * `<cdn>/media/<path>?w=225` to the ecom widget): the same width through cfit/v3, as
 * PNG; an original without a width becomes the original through cfit/v3.
 */
export const presizedLogoUrl = (src?: string) => waykeImage(src, { png: true });

export const imageSrcSet = (src: string, specs: ImageSpec[], webp?: boolean) =>
  specs
    .map(([width, height]) => {
      const descriptor = waykeMedia(src) || isCfit(src) ? snapCfitWidth(width) : width;
      return `${imageUrl(src, { width, height, webp })} ${descriptor}w`;
    })
    .join(', ');

/**
 * srcsets for a cfit image in AVIF, WebP and JPEG, as web-ui-v2's gallery has
 * them: the browser takes the first format it supports, in the width it needs.
 */
export const cfitSources = (src: string, widths: number[]) => {
  const set = (format?: 'avif' | 'webp') =>
    widths
      .map((width) => {
        const [base, query] = src.split('?');
        const params = new URLSearchParams(query);
        params.set('w', String(snapCfitWidth(width)));
        if (format) params.set('format', format);
        return `${base}?${params.toString()} ${snapCfitWidth(width)}w`;
      })
      .join(', ');
  return { avif: set('avif'), webp: set('webp'), jpeg: set() };
};
