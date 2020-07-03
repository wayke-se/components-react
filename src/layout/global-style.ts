import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  #root {
    background-color: #fff;
    font-size: 16px;
    color: #000;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a img {
    border: 0;
  }
`;
