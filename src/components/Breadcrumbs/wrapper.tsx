import styled from 'styled-components';

export const List = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 0.875rem;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
`;

export const Item = styled.li`
  display: flex;
  align-items: center;

  & + & {
    :before {
      content: '/';
      flex-shrink: 0;
      margin: 0 0.25em;
      color: ${(props) => props.theme.color.textDark};
    }
  }
`;

export const Link = styled.a`
  display: block;
  color: ${(props) => props.theme.color.textDark};
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }
`;

export const Label = styled.div`
  color: ${(props) => props.theme.color.textDarkLighten};
  white-space: nowrap;
`;
