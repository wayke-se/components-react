import styled from 'styled-components';

const Root = styled.div.attrs(() => ({
  className: 'wayke__theme wayke__font--regular',
}))`
  background-color: ${(props) => props.theme.color.bg};
  color: ${(props) => props.theme.color.textDark};
  font-size: 1rem;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  a img {
    border: 0;
  }
`;

export default Root;
