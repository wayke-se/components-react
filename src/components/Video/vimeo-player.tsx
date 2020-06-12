import React from 'react';
import { getVimeoId } from './utils';

type PropsType = {
  url: string;
  autoplay: boolean;
};

const VimeoPlayer = ({ url, autoplay }: PropsType) => (
  <div data-am-embed="">
    <iframe
      width="100%"
      height="100%"
      src={`https://player.vimeo.com/video/${getVimeoId(url)}?${
        autoplay ? '&autoplay=1' : ''
      }&loop=0&autopause=0`}
      frameBorder="0"
      allowFullScreen={true}
    />
  </div>
);

export default VimeoPlayer;
