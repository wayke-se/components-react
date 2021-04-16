import React from 'react';

import YouTubePlayer from './YoutubePlayer';
import VimeoPlayer from './VimeoPlayer';
import CustomPlayer from '../Video/CustomPlayer';

const ytNames = ['youtube.com', 'youtu.be'];
const isYouTubeVideo = (url: string): boolean =>
  ytNames.some((host: string): boolean => url.indexOf(host) >= 0);

const vNames = ['vimeo.com'];
const isVimeoVideo = (url: string): boolean =>
  vNames.some((host: string): boolean => url.indexOf(host) >= 0);

type PropsType = {
  url: string;
  autoplay?: boolean;
  controls?: boolean;
};

const VideoPlayer = ({ url, autoplay = false, controls = true }: PropsType) => {
  if (!url) return null;

  if (isYouTubeVideo(url)) return <YouTubePlayer url={url} autoplay={autoplay} />;

  if (isVimeoVideo(url)) return <VimeoPlayer url={url} autoplay={autoplay} />;

  return <CustomPlayer ratio="56.25%" controls={controls} url={url} />;
};

export default VideoPlayer;
