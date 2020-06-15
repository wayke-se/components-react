import React from 'react';
import { getYouTubeId } from './utils';

import { Wrapper, Iframe } from './wrapper';

type PropsType = {
  url: string;
  autoplay: boolean;
};

const YouTubePlayer = ({ url, autoplay }: PropsType) => (
  <Wrapper>
    <Iframe
      src={`https://www.youtube.com/embed/${getYouTubeId(url)}?&enablejsapi=1&?rel=0${
        autoplay ? '&autoplay=1' : ''
      }`}
    />
  </Wrapper>
);

export default YouTubePlayer;
