import React from 'react';

import { SearchItem_vehicle_branch_location_position } from '../../@types/gql/SearchItem';
import { Wrapper } from './wrapper';

const MAP_CENTER = { lat: 63.176683, lng: 14.636068 };
const createMarker = (map: google.maps.Map<HTMLDivElement>, position: google.maps.LatLng) =>
  new google.maps.Marker({
    position,
    map,
  });

interface MapProps {
  position?: SearchItem_vehicle_branch_location_position | null;
}

const Map = ({ position }: MapProps) => {
  const onRef = (ref: HTMLDivElement | null) => {
    if (ref && position) {
      const { latitude, longitude } = position;

      let markerPosition;
      let zoom = 15;
      let marker = true;
      if (position && latitude && longitude) {
        markerPosition = new google.maps.LatLng(latitude, longitude);
      } else {
        markerPosition = new google.maps.LatLng(MAP_CENTER.lat, MAP_CENTER.lng);
        zoom = 3;
        marker = false;
      }

      const _map = new google.maps.Map(ref, {
        center: markerPosition,
        zoom,
        disableDefaultUI: true,
        scrollwheel: false,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        clickableIcons: false,
        disableDoubleClickZoom: true,
        draggable: false,
        fullscreenControl: false,
      });
      if (marker) {
        createMarker(_map, markerPosition);
      }
    }
  };

  return <Wrapper ref={onRef} />;
};

export default Map;
