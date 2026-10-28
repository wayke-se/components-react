import React from 'react';
import { Img } from '../Lightbox/wrapper';
import Rotation from './Rotation';

// As the lightbox's own images.
const WIDTHS = [750, 1080, 1200, 1920];
const SIZES = '(min-aspect-ratio: 3/2) 150vh, 100vw';

type PropsType = {
  urls: string[];
};

/** A 360 image in the lightbox, ready to turn. */
const ThreeSixtyLightbox = ({ urls }: PropsType) => (
  <Rotation urls={urls} img={Img} widths={WIDTHS} sizes={SIZES} />
);

export default ThreeSixtyLightbox;
