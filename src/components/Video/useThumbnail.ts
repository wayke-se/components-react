import { useEffect, useState } from 'react';
import { getVimeoId, getYoutubeThumbnail } from './utils';

interface Response {
  thumbnail_large: string;
}

const useThumbnail = (url?: string | null) => {
  const [thumbnail, setThumbnail] = useState<string>();

  const getThumbnail = async (url: string) => {
    const id = getVimeoId(url);
    const result = await fetch(`http://vimeo.com/api/v2/video/${id}.json`);

    if (result.ok) {
      const json: Response[] = await result.json();
      if (json?.[0].thumbnail_large) {
        setThumbnail(json[0].thumbnail_large);
      }
    }
  };

  useEffect(() => {
    if (url) {
      const id = getVimeoId(url);
      const youtubeThumnail = getYoutubeThumbnail(url);
      if (id) {
        getThumbnail(url);
        return;
      } else if (youtubeThumnail) {
        setThumbnail(youtubeThumnail);
      }
    }
  }, [url]);

  return [thumbnail];
};

export default useThumbnail;
