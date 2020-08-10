const _colors = {
  black: '#000',
  white: '#fff',
  gray: '#ddd',
  grayLight: '#f8f8f8',
  grayLightTransparent: 'rgba(248, 248, 248, 0)',
  grayLightDarker: '#ebebeb',
  grayDark: '#717171',
  blue: '#1d61ca',
  ui: {
    greenLight: '#cdf5c8',
    green: '#2b8747',
    redLight: '#ffd0d0',
    red: '#c71f1f',
    yellowLight: '#fff4c7',
    blueLight: '#daf7fc',
  },
};

const theme = {
  color: {
    bg: _colors.white,
    link: _colors.blue,
    accent: _colors.grayLight,
    accentTransparent: _colors.grayLightTransparent,
    accentDark: _colors.grayLightDarker,
    border: _colors.gray,
    textDark: _colors.black,
    textDarkLighten: _colors.grayDark,
    textLight: _colors.white,
    hoverOverlay: 'rgba(0, 0, 0, 0.04)',
    disabledBg: _colors.gray,
    disabledText: _colors.grayDark,
    placeholder: _colors.grayDark,
    ui: {
      positiveLight: _colors.ui.greenLight,
      positive: _colors.ui.green,
      neutralLight: _colors.ui.yellowLight,
      negativeLight: _colors.ui.redLight,
      negative: _colors.ui.red,
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
  distances: {
    baseUnit: '8px',
    inputHeight: '48px',
    containerMaxWidth: '1312px',
  },
};

export type Theme = typeof theme;
export default theme;
