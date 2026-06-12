import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import MediaButton from '../Gallery/MediaButton';
import { Img, Item } from '../Lightbox/wrapper';
import Rotation from './Rotation';

type PropsType = {
  urls: string[];
};

const ThreeSixtyLightbox = ({ urls }: PropsType) => {
  const { t } = useTranslation();
  const [started, setStarted] = useState(false);

  const onStart = useCallback(() => setStarted(true), []);

  if (!started) {
    return (
      <Item>
        <Img src={urls[0]} alt="alt" />
        <MediaButton text={t('item.start360Exterior')} onClick={onStart} />
      </Item>
    );
  }

  return (
    <Rotation>
      {urls.map((image, i) => (
        <Img key={image} src={image} alt={t('common.imageIndex', { index: i + 1 }) || ''} />
      ))}
    </Rotation>
  );
};

export default ThreeSixtyLightbox;
