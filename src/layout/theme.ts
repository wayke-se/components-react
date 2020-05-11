const _colors = {
  black: '#000',
  white: '#fff',
  gray: '#ddd',
  grayLight: '#f8f8f8',
  grayLightDarker: '#ebebeb',
  grayDark: '#717171',
  blue: '#1d61ca',
  ui: {
    greenLight: '#cdf5c8',
    redLight: '#ffd0d0',
    yellowLight: '#fff4c7',
    blueLight: '#daf7fc',
  },
};

const theme = {
  color: {
    bg: _colors.white,
    link: _colors.blue,
    accent: _colors.grayLight,
    accentDark: _colors.grayLightDarker,
    border: _colors.gray,
    textDark: _colors.black,
    textDarkLighten: _colors.grayDark,
    hoverOverlay: 'rgba(0, 0, 0, 0.04)',
    disabledBg: _colors.gray,
    disabledText: _colors.grayDark,
    placeholder: _colors.grayDark,
    ui: {
      positiveLight: _colors.ui.greenLight,
      neutralLight: _colors.ui.yellowLight,
      negativeLight: _colors.ui.redLight,
      infoLight: _colors.ui.blueLight,
    },
  },
  breakpoint: {
    Sm: '@media (min-width: 600px)',
    LtSm: '@media (max-width: 599px)',
    Md: '@media (min-width: 900px)',
    LtMd: '@media (max-width: 899px)',
    Lg: '@media (min-width: 1200px)',
    LtLg: '@media (max-width: 1199px)',
  },
  font: 'sans-serif',
  distances: {
    baseUnit: '8px',
    containerMaxWidth: '1312px',
  },
};

export type Theme = typeof theme;
export default theme;
