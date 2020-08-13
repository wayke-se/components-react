export const getVimeoId = (url: string): string => {
  const regExp = /\/(\d+)/;
  const match = url.match(regExp);
  return match && match[1].length > 3 ? match[1] : '';
};

export const getYouTubeId = (url: string): string => {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[7].length === 11 ? match[7] : '';
};

const youtubeBase = 'https://img.youtube.com/vi/';
export const getYoutubeThumbnail = (url: string) => {
  const id = getYouTubeId(url);
  if (!id) {
    return undefined;
  }
  return {
    maxresdefault: `${youtubeBase}${id}/maxresdefault.jpg`,
    hqdefault: `${youtubeBase}${id}/hqdefault.jpg`,
    mqdefault: `${youtubeBase}${id}/mqdefault.jpg`,
  };
};

export const onImageLoad = (
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  thumbnail?: string[]
) => {
  if (
    thumbnail?.length === 2 &&
    e.currentTarget.src === thumbnail[0] &&
    e.currentTarget.naturalWidth === 120 &&
    e.currentTarget.naturalHeight === 90
  ) {
    e.currentTarget.src = thumbnail[1];
  }
};

export const onImageError = (
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  thumbnail?: string[]
) => {
  if (thumbnail?.length === 2) {
    e.currentTarget.src = thumbnail[1];
  }
};
