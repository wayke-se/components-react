import React from 'react';
import SphereViewer from './SphereViewer';

import { ImageFull } from '../Gallery/wrapper';
import MediaButton from '../Gallery/MediaButton';
import { useTranslation } from 'react-i18next';

const onMediaClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, func: () => void) => {
  e.stopPropagation();
  e.preventDefault();
  func();
};

type PropsType = {
  url: string;
  preview: string;
  navigationDisabled: boolean;
  visible: boolean;
  onDisableNavigation: () => void;
};

const Sphere = ({ url, preview, visible, onDisableNavigation, navigationDisabled }: PropsType) => {
  const { t } = useTranslation();
  if (!visible || (!navigationDisabled && visible)) {
    return (
      <>
        <ImageFull src={preview} alt="alt" />
        <MediaButton
          text={t('item.start360Interior')}
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void =>
            onMediaClick(e, onDisableNavigation)
          }
        />
      </>
    );
  }
  if (navigationDisabled && visible) {
    return (
      <SphereViewer
        id={url}
        preview={url}
        src={url}
        autoLoad={true}
        onStart={onDisableNavigation}
      />
    );
  }
  return null;
};

export default Sphere;
