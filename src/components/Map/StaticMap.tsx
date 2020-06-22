import React, { useState, useCallback } from 'react';
import { SearchItem_vehicle_branch_location_position } from '../../@types/gql/SearchItem';
import useSettings from '../../hooks/useSettings';

interface StaticMapProps {
  position?: SearchItem_vehicle_branch_location_position | null;
}

const StaticMap = ({ position }: StaticMapProps) => {
  const { googleMapsApiKey } = useSettings();
  const [visible, setVisible] = useState(false);

  const onShowMap = useCallback(() => {
    if (googleMapsApiKey) {
      setVisible(true);
    }
  }, []);

  if (!position) {
    return null;
  }

  const { latitude, longitude } = position;

  if (visible && googleMapsApiKey) {
    return (
      <a
        href={`http://maps.google.com/maps?q=${latitude},${longitude}`}
        title="Visa på Google Maps"
        target="_blank"
        rel="nofollow noopener noreferrer"
      >
        <img
          src={`https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=10&size=610x286&maptype=roadmap&markers=icon:${encodeURIComponent(
            `${location.protocol}//${location.hostname}/images/map/marker.png`
          )}%7C${latitude},${longitude}&key=${googleMapsApiKey}`}
          className="l-block l-full"
        />
      </a>
    );
  }
  return (
    <button
      style={{
        backgroundImage: `${location.protocol}//${location.hostname}/images/placeholders/staticmap.png`,
      }}
      onClick={onShowMap}
    >
      Visa karta
    </button>
  );
};

export default StaticMap;
