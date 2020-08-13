import { useEffect, useState } from 'react';
import useFetch from './useFetch';

interface VimeoItem {
  thumbnail_large: string;
  thumbnail_small: string;
}

const useVimeoThumbnail = (id?: string, small?: boolean) => {
  const [thumbnail, setThumbnail] = useState<string>();
  const { data } = useFetch<VimeoItem[]>(
    `http://vimeo.com/api/v2/video/${id}.json`,
    {},
    !id || !!thumbnail,
    true
  );

  useEffect(() => {
    if (data?.[0]) {
      if (small && data[0].thumbnail_small) {
        setThumbnail(data[0].thumbnail_small);
      } else if (data[0].thumbnail_large) {
        setThumbnail(data[0].thumbnail_large);
      }
    }
  }, [data]);

  return thumbnail;
};

export default useVimeoThumbnail;
