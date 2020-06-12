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

export const getYoutubeThumbnail = (url: string): string =>
  `https://img.youtube.com/vi/${getYouTubeId(url)}/maxresdefault.jpg`;
export const getYoutubeThumbnailSafe = (url: string): string =>
  `https://img.youtube.com/vi/${getYouTubeId(url)}/0.jpg`;
