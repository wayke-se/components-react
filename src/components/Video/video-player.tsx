import React from 'react';

import YouTubePlayer from './youtube-player';
import VimeoPlayer from './vimeo-player';

const ytNames = ['youtube.com', 'youtu.be'];
const isYouTubeVideo = (url: string): boolean =>
  ytNames.some((host: string): boolean => url.indexOf(host) >= 0);

const vNames = ['vimeo.com'];
const isVimeoVideo = (url: string): boolean =>
  vNames.some((host: string): boolean => url.indexOf(host) >= 0);

type PropsType = {
  url: string;
  autoplay?: boolean;
};

const VideoPlayer = ({ url, autoplay = false }: PropsType) => {
  if (!url) return null;

  if (isYouTubeVideo(url)) return <YouTubePlayer url={url} autoplay={autoplay} />;

  if (isVimeoVideo(url)) return <VimeoPlayer url={url} autoplay={autoplay} />;

  return null;
};

export default VideoPlayer;
