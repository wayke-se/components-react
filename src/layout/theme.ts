const _colors = {
  black: '#000',
  white: '#fff',
  gray: '#ddd',
  grayLight: '#f8f8f8',
  grayLightDarker: '#ebebeb',
  grayDark: '#7d7d7d',
  blue: '#1d61ca',
  brand: {
    blue: '#161e2e',
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
    disabledBg: _colors.gray,
    disabledText: _colors.grayDark,
    placeholder: _colors.grayDark,
    brand: {
      primary: _colors.brand.blue,
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
