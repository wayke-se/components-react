import React from 'react';
import { getYouTubeId } from '../Video/utils';

type PropsType = {
  url: string;
  autoplay: boolean;
};

const YouTubePlayer = ({ url, autoplay }: PropsType) => (
  <div data-am-embed="">
    <iframe
      width="100%"
      height="100%"
      allowFullScreen={true}
      src={`https://www.youtube.com/embed/${getYouTubeId(url)}?&enablejsapi=1&?rel=0${
        autoplay ? '&autoplay=1' : ''
      }`}
      frameBorder="0"
    />
  </div>
);

export default YouTubePlayer;
