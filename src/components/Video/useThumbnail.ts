import { useEffect, useState } from 'react';
import { getVimeoId, getYoutubeThumbnail } from './utils';
import useVimeoThumbnail from '../../hooks/useVimeoThumbnail';

const useThumbnail = (url?: string | null, small?: boolean) => {
  if(url?.toLowerCase().endsWith('.mp4')) return;
  
  const [thumbnail, setThumbnail] = useState<string[]>();
  const vimeoId = url ? getVimeoId(url) : undefined;
  const vimeoThumbnail = useVimeoThumbnail(vimeoId, small);

  useEffect(() => {
    if (url) {
      const youtubeThumbnail = getYoutubeThumbnail(url);
      if (youtubeThumbnail) {
        if (small) {
          setThumbnail([youtubeThumbnail.mqdefault]);
        } else {
          setThumbnail([youtubeThumbnail.maxresdefault, youtubeThumbnail.hqdefault]);
        }
      }
    }
  }, [url]);

  return vimeoThumbnail ? [vimeoThumbnail] : thumbnail;
};

export default useThumbnail;
