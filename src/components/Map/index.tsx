import React, { useState, useCallback } from 'react';
import { SearchItem_vehicle_branch_location_position } from '../../@types/gql/SearchItem';
import useSettings from '../../hooks/useSettings';

import { Wrapper, Image, Placeholder, PlaceholderAction } from './wrapper';
import { ButtonSecondary, ButtonContent } from '../Button';

interface StaticMapProps {
  position?: SearchItem_vehicle_branch_location_position | null;
}

const StaticMap = ({ position }: StaticMapProps) => {
  const { googleMapsApiKey } = useSettings();
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
        title="Visa på Google Maps"
        target="_blank"
        rel="nofollow noopener noreferrer"
      >
        <Image
          src={`https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=10&size=640x280&maptype=roadmap&markers=icon:${encodeURIComponent(
            `${location.protocol}//${location.hostname}/images/map/marker.png`
          )}%7C${latitude},${longitude}&key=${googleMapsApiKey}`}
          alt="Karta"
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
          <ButtonContent>Visa karta</ButtonContent>
        </ButtonSecondary>
      </PlaceholderAction>
    </Placeholder>
  );
};

export default StaticMap;
