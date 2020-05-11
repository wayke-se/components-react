import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  #root {
    background-color: ${(props) => props.theme.color.bg};
    font-size: 16px;
    color: ${(props) => props.theme.color.textDark};
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a img {
    border: 0;
  }
`;
