import React from 'react';
import { getVimeoId } from './utils';

import { Wrapper, Iframe } from './wrapper';

type PropsType = {
  url: string;
  autoplay: boolean;
};

const VimeoPlayer = ({ url, autoplay }: PropsType) => (
  <Wrapper>
    <Iframe
      src={`https://player.vimeo.com/video/${getVimeoId(url)}?${
        autoplay ? '&autoplay=1' : ''
      }&loop=0&autopause=0`}
    />
  </Wrapper>
);

export default VimeoPlayer;
