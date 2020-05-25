import React from 'react';

import { Wrapper } from './wrapper';

interface Props {
  image: string;
  alt?: string;
}

const Avatar = ({ image, alt }: Props) => <Wrapper image={image} aria-label={alt} />;

export default Avatar;
