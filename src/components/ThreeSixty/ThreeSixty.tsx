import React from 'react';

import { Image } from '../Gallery/wrapper';
import MediaButton from '../Gallery/MediaButton';
import Rotation from './Rotation';
import { useTranslation } from 'react-i18next';

const onMediaClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, func: () => void) => {
  e.stopPropagation();
  e.preventDefault();
  func();
};

type PropsType = {
  urls: string[];
  navigationDisabled: boolean;
  visible: boolean;
  onDisableNavigation: () => void;
};

const ThreeSixty = ({ urls, visible, onDisableNavigation, navigationDisabled }: PropsType) => {
  const { t } = useTranslation();
  if (!visible || (!navigationDisabled && visible)) {
    return (
      <>
        <Image src={urls[0]} alt="alt" />
        <MediaButton
          text={t('item.start360Exterior')}
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void =>
            onMediaClick(e, onDisableNavigation)
          }
        />
      </>
    );
  }
  if (navigationDisabled && visible) {
    return (
      <div
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <Rotation>
          {urls.map((image, i) => (
            <Image key={image} src={image} alt={t('common.imageIndex', { index: i + 1 }) || ''} />
          ))}
        </Rotation>
      </div>
    );
  }
  return null;
};

export default ThreeSixty;
