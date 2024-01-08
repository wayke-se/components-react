import React, { useState, useCallback } from 'react';
import useSettings from '../../State/Settings/useSettings';

import { Wrapper, Image, Placeholder, PlaceholderAction } from './wrapper';
import { ButtonSecondary, ButtonContent } from '../Button';
import { Position, Maybe } from '../../@types/codegen/types';
import { useTranslation } from 'react-i18next';

interface StaticMapProps {
  position?: Maybe<Position>;
}

const StaticMap = ({ position }: StaticMapProps) => {
  const { t } = useTranslation();
  const { googleMapsApiKey, googleMapsMarker } = useSettings();
  const [visible, setVisible] = useState(false);

  const onShowMap = useCallback((e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (googleMapsApiKey) {
      e.preventDefault();
      setVisible(true);
    }
  }, []);

  if (!position) {
    return null;
  }

  const { latitude, longitude } = position;

  if (visible && googleMapsApiKey) {
    return (
      <Wrapper
        href={`http://maps.google.com/maps?q=${latitude},${longitude}`}
        title={t('item.showOnGoogleMaps')}
        target="_blank"
        rel="nofollow noopener noreferrer"
      >
        <Image
          src={`https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=10&size=640x280&maptype=roadmap&markers=${
            googleMapsMarker ? `icon:${encodeURIComponent(googleMapsMarker)}` : ''
          }%7C${latitude},${longitude}&key=${googleMapsApiKey}`}
          alt={t('item.googleMapsMapAlt')}
        />
      </Wrapper>
    );
  }
  return (
    <Placeholder
      href={`http://maps.google.com/maps?q=${latitude},${longitude}`}
      target="_blank"
      rel="noopener noreferrer nofollow"
      onClick={onShowMap}
    >
      <PlaceholderAction>
        <ButtonSecondary as="div">
          <ButtonContent>{t('item.googleMapsPlaceholderInit')}</ButtonContent>
        </ButtonSecondary>
      </PlaceholderAction>
    </Placeholder>
  );
};

export default StaticMap;
