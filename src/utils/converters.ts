import {
  COLOR_WHITE,
  COLOR_BLACK,
  COLOR_GRAY,
  COLOR_SILVER,
  COLOR_BLUE,
  COLOR_RED,
  COLOR_BROWN,
  COLOR_GREEN,
  COLOR_ORANGE,
  COLOR_YELLOW,
  COLOR_PURPLE,
  COLOR_BEIGE,
} from './constants';

export const getHexColorFromDisplayName = (displayName: string) => {
  switch (displayName) {
    case COLOR_WHITE.displayName:
      return COLOR_WHITE.hex;
    case COLOR_BLACK.displayName:
      return COLOR_BLACK.hex;
    case COLOR_GRAY.displayName:
      return COLOR_GRAY.hex;
    case COLOR_SILVER.displayName:
      return COLOR_SILVER.hex;
    case COLOR_BLUE.displayName:
      return COLOR_BLUE.hex;
    case COLOR_RED.displayName:
      return COLOR_RED.hex;
    case COLOR_BROWN.displayName:
      return COLOR_BROWN.hex;
    case COLOR_GREEN.displayName:
      return COLOR_GREEN.hex;
    case COLOR_ORANGE.displayName:
      return COLOR_ORANGE.hex;
    case COLOR_YELLOW.displayName:
      return COLOR_YELLOW.hex;
    case COLOR_PURPLE.displayName:
      return COLOR_PURPLE.hex;
    case COLOR_BEIGE.displayName:
      return COLOR_BEIGE.hex;
    default:
      return '#fff';
  }
};
